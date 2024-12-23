"use client";

import{
    AlertDialog,
    AlertDialogAction,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import React from "react";

interface Props{
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowName: string;
}

function DeleteWorkflowDialog({open, setOpen, workflowName}: Props) {
    const [confirmText, setConfirmText] = React.useState("");
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    If you delete this workflow, you won't be able to recover it back again.
                <div className="flex flex-col py-4 gap-2">
                    <p>If you are sure, enter <b>{workflowName}</b> to confirm:
                    </p> <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)}/>
                </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={confirmText !== workflowName}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteWorkflowDialog


