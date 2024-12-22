"use client";

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button';
import { Layers2Icon } from 'lucide-react';
import CustomDialogHeader from '@/components/CustomDialogHeader'; // Ensure this component returns a valid React element

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
    const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
    </DialogTrigger>
    <DialogContent className='px-0'>
        <CustomDialogHeader 
            icon={Layers2Icon}
            title="Create workflow"
            subTitle="Start building your workflow"/>
    </DialogContent>
    </Dialog>
  )
}

export default CreateWorkflowDialog
