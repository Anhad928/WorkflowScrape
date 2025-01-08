"use client";

import React, { useEffect, useState } from 'react'
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
import cronstrue from "cronstrue";

export default function SchedulerDialog(props: {workflowId: string, cron:string | null}) {

    const [cron, setCron] = useState(props.cron || "");
    const [validCron, setValidCron] = useState(false);
    const [readableCron, setReadableCron] = useState("");
    const mutation = useMutation({
        mutationFn: UpdateWorkflowCron,
        onSuccess: () => {
            toast.success("Schedule updated successfully", { id: "cron"})
        },
        onError: () => {
            toast.error("Something went wrong", { id: "cron" })
        }
    });

    useEffect(() => {
        try {
            const humanCronStr = cronstrue.toString(cron);
            setValidCron(true);
            setReadableCron(humanCronStr);
        } catch (error) {
            setValidCron(false)
        }
    }, [cron])
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
                <div className={cn("bg-accent rounded-md p-4 border text-sm border-destructive text-destructive",
                    validCron && "border-primary text-primary"
                )}>
                    {validCron ? readableCron : "Not a valid cron expression"}
                </div>
            </div>
            <DialogFooter className='px-6 gap-2'>
                <DialogClose asChild>
                    <Button className='w-full' variant={"secondary"}>
                        Cancel
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button className='w-full' disabled={mutation.isPending} onClick={() => {
                        toast.loading("Saving...", { id: "cron" })
                        mutation.mutate({
                            id: props.workflowId,
                            cron
                        })
                    }}>Save</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
