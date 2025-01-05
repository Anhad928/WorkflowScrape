import "server-only";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "@/types/workflow";
import { waitFor } from "../helper/waitFor";
import { ExecutionPhase } from "@prisma/client";
import { AppNode } from "@/types/appNode";
import { TaskRegistry } from "./task/registry";
import { TaskParamType, TaskType } from "@/types/task";
import { ExecutorRegistry } from "./executor/registry";
import { Enviornment, ExecutionEnviornment } from "@/types/executor";
import { Browser, Page } from "puppeteer";
import { Edge } from "@xyflow/react";
import { LogCollector } from "@/types/log";
import { createLogCollector } from "../log";

export async function ExecuteWorkflow(executionId: string) {
    const execution = await prisma.workflowExecution.findUnique({
        where: {
            id: executionId,
        },
        include: {
            workflow: true,
            phases: true
        },
    });

    if (!execution) {
        throw new Error("Execution not found");
    }

    const edges = JSON.parse(execution.defination).edges as Edge[];
    
    const enviornment: Enviornment = { phases: {} };

    await initializeWorkflowExecution(executionId, execution.workflowId);
    await initializePhaseStatuses(execution);

    const logCollector = createLogCollector();

    let creditsConsumed = 0;
    let executionFailed = false;
    for (const phase of execution.phases) {
        // TODO: consume credits
        const phaseExecution = await executeWorkflowPhase(phase, enviornment, edges, logCollector);
        if (!phaseExecution.success) {
            executionFailed = true;
            break;
        }
    }

    await finalizeWorkflowExecution(executionId, execution.workflowId, executionFailed, creditsConsumed);
    
    await cleanupEnviornment(enviornment);

    revalidatePath("/workflows/runs")
}



async function initializeWorkflowExecution(executionId: string, workflowId: string) {
    await prisma.workflowExecution.update({
        where: { id: executionId },
        data: {
            startedAt: new Date(),
            status: WorkflowExecutionStatus.RUNNING,
        },
    });

    await prisma.workflow.update({
        where: {
            id: workflowId,
        },
        data:{
            lastRunAt: new Date(),
            lastRunStatus: WorkflowExecutionStatus.RUNNING,
            lastRunId: executionId,
        }
    })
}


async function initializePhaseStatuses(execution: any) {
    await prisma.executionPhase.updateMany({
        where:{
            id: {
                in: execution.phases.map((phase: any) => phase.id),
            },
        },
        data: {
            status: ExecutionPhaseStatus.PENDING,
        },
    })
}

async function finalizeWorkflowExecution(
    executionId: string,
    workflowId: string,
    executionFailed: boolean,
    creditsConsumed: number,
){
    const finalStatus = executionFailed ? WorkflowExecutionStatus.FAILED : WorkflowExecutionStatus.COMPLETED;

    await prisma.workflowExecution.update({
        where: { id: executionId },
        data: {
            status: finalStatus,
            completedAt: new Date(),
            creditsConsumed,
        },
    });

    await prisma.workflow.update({
        where: {
            id: workflowId,
            lastRunId: executionId,
        },
        data: {
            lastRunStatus: finalStatus,
            
        },
    }).catch((err) => {
        //ignore
        //  this means that we have triggered other runs for this workflow
        // while an execution was running
    })
}


async function executeWorkflowPhase(phase: ExecutionPhase, enviornment: Enviornment, edges: Edge[], logCollector: LogCollector) {
    const startedAt = new Date();
    const node = JSON.parse(phase.node) as AppNode;
    setupEnviornmentForPhase(node, enviornment, edges);
    // Update phase status
    await prisma.executionPhase.update({
        where: { id: phase.id },
        data: {
            startedAt,
            status: ExecutionPhaseStatus.RUNNING,
            inputs: JSON.stringify(enviornment.phases[node.id].inputs),
        },
    });


    const creditsRequired = TaskRegistry[node.data.type].credits;
    console.log(`Executing phase ${phase.name} with ${creditsRequired} credits required`);

    // TODO: decrement user balance ( with required credits )

    // Execute phase simulation
    const success = await executePhase(phase, node, enviornment, logCollector);

    const outputs = enviornment.phases[node.id].outputs;
    await finalizePhase(phase.id, success, outputs );
    return { success };
}


async function finalizePhase(phaseId: string, success: boolean, outputs: any) {
    const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED;

    await prisma.executionPhase.update({
        where: {
            id: phaseId,
        },
        data: {
            status: finalStatus,
            completedAt: new Date(),
            outputs: JSON.stringify(outputs),   

        }
    });
}

async function executePhase(
    phase: ExecutionPhase,
    node: AppNode,
    enviornment: Enviornment,
    logCollector: LogCollector
): Promise<boolean> {
    const runFn = ExecutorRegistry[node.data.type];
    if (!runFn) {
        return false;
    }

    const ExecutionEnviornment: ExecutionEnviornment<any> = createExecutionEnviornment(node, enviornment, logCollector);
    return await runFn(ExecutionEnviornment);
}

function setupEnviornmentForPhase(node: AppNode, enviornment: Enviornment, edges: Edge[]) {
    enviornment.phases[node.id] = {inputs: {}, outputs: {}};
    const inputs = TaskRegistry[node.data.type].inputs;
    for (const input of inputs) {
        if (input.type === TaskParamType.BROWSER_INSTANCE) continue;
        const inputValue = node.data.inputs[input.name];
        if (inputValue) {
            enviornment.phases[node.id].inputs[input.name] = inputValue;
            continue;
        }

        // Get input value from outputs in the enviornment
        const connectedEdge = edges.find(
            edge => edge.target === node.id && edge.targetHandle === input.name
        );

        if (!connectedEdge) {
            console.error("Missing edge for input", input.name, "node id:", node.id);
            continue;
        }

        const outputValue = enviornment.phases[connectedEdge.source].outputs[
            connectedEdge.sourceHandle!
        ]

        enviornment.phases[node.id].inputs[input.name] = outputValue;
    }
}

function createExecutionEnviornment(node: AppNode, enviornment: Enviornment, logCollector: LogCollector) : ExecutionEnviornment<any> {
    return {
        getInput: (name:string) => enviornment.phases[node.id]?.inputs[name],
        setOutput: (name: string, value: string) => {
            enviornment.phases[node.id].outputs[name] = value;
        },

        getBrowser: () => enviornment.browser,
        setBrowser: (browser: Browser) => (enviornment.browser = browser),


        getPage: () => enviornment.page,    
        setPage: (page:Page) => (enviornment.page = page),

        log: logCollector,
    };
}

async function cleanupEnviornment(enviornment: Enviornment) {
    // if (enviornment.page) {
    //     await enviornment.page.close();
    // }

    if (enviornment.browser) {
        await enviornment.browser.close().catch(err => console.log("cannot close browser, reason:", err));
    }
}