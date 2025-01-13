"use client";

import { DeleteCredential } from "@/actions/credentials/deleteCredential";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props{
    name: string;
}

function DeleteCredentialDialog({name}: Props) {
    const [open, setOpen] = useState(false);
    const [confirmText, setConfirmText] = React.useState("");

    const deleteMutation = useMutation({
        mutationFn: DeleteCredential,
        onSuccess: () => {
            toast.success("Credential deleted successfully", {id: name});
            setConfirmText("");
        },
        onError: () => {
            toast.error("Failed to delete credential", {id: name});
        },
    });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
            <Button variant={"destructive"} size={"icon"}>
                <XIcon size={18}/>
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    If you delete this Credential, you won't be able to recover it back again.
                <div className="flex flex-col py-4 gap-2">
                    <p>If you are sure, enter <b>{name}</b> to confirm:
                    </p> <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)}/>
                </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={() => {
                    setConfirmText("");
                }}>Cancel</AlertDialogCancel>
                <AlertDialogAction disabled={confirmText !== name || deleteMutation.isPending} 
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => {
                    toast.loading("Deleting Credential...", {id: name});
                    deleteMutation.mutate(name);
                }}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteCredentialDialog


