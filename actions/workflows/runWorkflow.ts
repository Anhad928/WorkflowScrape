"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/types/workflow";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";

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
    console.log("Execution Plan", executionPlan);
}