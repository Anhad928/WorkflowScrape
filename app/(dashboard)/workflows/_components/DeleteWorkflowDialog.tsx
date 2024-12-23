"use client";

import { DeleteWorkflow } from "@/actions/workflows/deletWorkflow";
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
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

interface Props{
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowName: string;
    workflowId: string;
}

function DeleteWorkflowDialog({open, setOpen, workflowName, workflowId}: Props) {
    const [confirmText, setConfirmText] = React.useState("");

    const deleteMutation = useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: () => {
            toast.success("Workflow deleted successfully", {id: workflowId});
            setConfirmText("");
        },
        onError: () => {
            toast.error("Failed to delete workflow", {id: workflowId});
        },
    });

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
                <AlertDialogCancel onClick={() => {
                    setConfirmText("");
                }}>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={confirmText !== workflowName || deleteMutation.isPending} 
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => {
                    toast.loading("Deleting Workflow...", {id: workflowId});
                    deleteMutation.mutate(workflowId);
                }}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteWorkflowDialog


