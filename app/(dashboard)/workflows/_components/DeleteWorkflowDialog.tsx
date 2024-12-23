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

interface Props{
    open: boolean;
    setOpen: (open: boolean) => void;
}

function DeleteWorkflowDialog({open, setOpen}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you Sure?</AlertDialogTitle>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteWorkflowDialog


