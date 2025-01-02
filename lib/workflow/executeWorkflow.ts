import "server-only";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { WorkflowExecutionStatus } from "@/types/workflow";

export async function executeWorkflow(executionId: string) {
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

    const enviornment = { phases: {
        launchBrowser: {
            inputs:{
                websiteUrl: "www.google.com",
            },
            outputs: {
                browser: "PuppetterInstance",
            },
        },
    },
    };

    await initializeWorkflowExecution(executionId, execution.workflowId);
    // todo: initialize workflow status

    let executionFailed = false;
    for (const phase of execution.phases) {
        // TODO: execute phase
    }

    // TODO: finalize execution
    // TODO: clean up enviornment

    revalidatePath("/workflows/runs")
}



async function initializeWorkflowExecution(executionId: string, workflowId: string) {
    await prisma.workflowExecution.update({
        where: { id: executionId },
        data: {
            startedAt: new Date(),
            status: WorkflowExecutionStatus.RUNNING,
        }
    })
}