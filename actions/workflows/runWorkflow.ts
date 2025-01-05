"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ExecutionPhaseStatus, WorkflowExecutionPlan, WorkflowExecutionPlanPhase, WorkflowExecutionStatus, WorkflowExecutionTrigger } from "@/types/workflow";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { start } from "repl";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { redirect } from "next/navigation";
import { ExecuteWorkflow } from "@/lib/workflow/executeWorkflow";

export async function RunWorkflow(form: {
    workflowId: string;
    flowDefination?: string;
}) {
    const {userId} = auth();
    if (!userId) {
        throw new Error("unauthenticated");
    }

    const { workflowId, flowDefination } = form;
    if (!workflowId) {
        throw new Error("workflowId is required");
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            userId,
            id: workflowId,
        },
    });

    if (!workflow) {
        throw new Error("workflow not found");
    }
    
    let executionPlan: WorkflowExecutionPlan;
    if (!flowDefination){
        throw new Error("flow defination is not defined");
    }

    const flow = JSON.parse(flowDefination);
    const result = FlowToExecutionPlan(flow.nodes, flow.edges);
    if (result.error) {
        throw new Error("flow defination not valid");
    }

    if (!result.executionPlan) {
        throw new Error("no execution plan generated");
    }

    executionPlan = result.executionPlan;
    
    const execution = await prisma.workflowExecution.create({
    data: {
        workflowId,
        userId,
        status: WorkflowExecutionStatus.PENDING,
        startedAt: new Date(),
        trigger: WorkflowExecutionTrigger.MANUAL,
        defination: flowDefination,
        phases: {
            create: executionPlan.flatMap((phase) => {
                return phase.nodes.flatMap((node) => {
                    return {
                        userId,
                        status: ExecutionPhaseStatus.CREATED,
                        number: phase.phase,
                        node: JSON.stringify(node),
                        name: TaskRegistry[node.data.type].label,
                    };
                });
            }),
        },
    },
    select: {
        id: true,
        phases: true,

    },        
    });
    if (!execution) {
        throw new Error("workflow execution not created");
    }

    ExecuteWorkflow(execution.id); // run this on background
    redirect(`/workflow/runs/${workflowId}/${execution.id}`);
}


