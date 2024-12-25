"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function UpdateWorkflow({
    id, defination
}:{
    id: string,
    defination: string;
}) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id,
            userId,
        },
        
    });

    if (!workflow) {
        throw new Error("Workflow not found");
    }
    if (workflow.status !== "DRAFT") {
        throw new Error("Workflow is not in draft state");
    }

    await prisma.workflow.update({
        data: {
            defination,
        },
        where: {
            id,
            userId,
        },
    });

}