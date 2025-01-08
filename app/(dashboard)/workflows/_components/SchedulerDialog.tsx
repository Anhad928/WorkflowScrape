"use client";

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TriangleAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CustomDialogHeader from '@/components/CustomDialogHeader';

export default function SchedulerDialog() {
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
            <CustomDialogHeader title='Schedule workflow execution'/>
        </DialogContent>
    </Dialog>
  )
}
