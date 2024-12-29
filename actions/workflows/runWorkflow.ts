"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/types/workflow";

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
    
    let executionPlan: WorkflowExecutionPlan;
    if (!flowDefination){
        throw new Error("flow defination is not defined");
    }
}