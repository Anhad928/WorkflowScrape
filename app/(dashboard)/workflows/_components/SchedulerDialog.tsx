"use client";

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon, TriangleAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { UpdateWorkflowCron } from '@/actions/workflows/updateWorkflowCron';

export default function SchedulerDialog({workflowId}: {workflowId: string}) {

    const [cron, setCron] = useState("");

    const mutation = useMutation({
        mutationFn: UpdateWorkflowCron,
        onSuccess: () => {
            toast.success("Schedule updated successfully", { id: "cron"})
        },
        onError: () => {
            toast.error("Something went wrong", { id: "cron" })
        }
    })
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={"link"} size={"sm"} className={cn("text-sm p-0 h-auto")}>
                <div className='flex items-center gap-1'>
                    <TriangleAlertIcon className='h-3 w-3'/> Set Schedule
                </div>
            </Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
            <CustomDialogHeader title='Schedule workflow execution' 
            icon ={CalendarIcon}
            />
            <div className="p-6 space-y-4">
                <p className='text-muted-foreground text-sm'>
                    Specify a cron expression to Schedule periodic workflow execution.
                    All time are in UTC
                </p>
                <Input placeholder='E.g. * * * * *' value = {cron} onChange={(e) => setCron(e.target.value)}/>
            </div>
            <DialogFooter className='px-6 gap-2'>
                <DialogClose asChild>
                    <Button className='w-full' variant={"secondary"}>
                        Cancel
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button className='w-full' disabled={mutation.isPending} onClick={() => {
                        mutation.mutate({
                            id: workflowId,
                            cron
                        })
                    }}>Save</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
