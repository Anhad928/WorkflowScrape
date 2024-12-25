"use server";

import { waitFor } from "@/lib/helper/waitFor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function UpdateWorkflow({
    id, defination
}:{
    id: string,
    defination: string;
}) {
    await waitFor(3000);
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
    revalidatePath(`/workflows`);
}