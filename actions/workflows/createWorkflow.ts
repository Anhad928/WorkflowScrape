"use server";

import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { auth } from "@clerk/nextjs/server";


export async function CreateWorkflow(form: createWorkflowSchemaType){
    const {success, data} = createWorkflowSchema.safeParse(form);
    if(!success){
        throw new Error("Invalid form data");
    }

    const { userId } = auth();
}
