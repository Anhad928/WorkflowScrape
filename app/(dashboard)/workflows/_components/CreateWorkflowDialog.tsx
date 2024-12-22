"use client";

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button';
import { Layers2Icon } from 'lucide-react';
import CustomDialogHeader from '@/components/CustomDialogHeader'; // Ensure this component returns a valid React element
import { useForm } from 'react-hook-form';
import { createWorkflowSchema, createWorkflowSchemaType } from '@/schema/workflow';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';

function CreateWorkflowDialog({ triggerText }: { triggerText?: string }) {
    const [open, setOpen] = useState(false);

    const form = useForm<createWorkflowSchemaType>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {},
    });
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
            <div className='p-6 '>
                <Form {...form}>
                    <form className='space-y-8 w-full'>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className='flex gap-1 items-center'>Name
                            <p className='text-xs text-primary'>(required)</p>
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                Choose a descriptive name for your workflow
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />


                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className='flex gap-1 items-center'>Description
                            <p className='text-xs text-muted-foreground'>(optional)</p>
                            </FormLabel>
                            <FormControl>
                                <Textarea className='resize-none' {...field} />
                            </FormControl>
                            <FormDescription>
                                Provide a brief description of what your workflow does.
                                <br/> This is optional but can help you remember the purpose of the workflow
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className='w-full'>
                            Proceed
                        </Button>
                    </form>
                </Form>

            </div>
    </DialogContent>
    </Dialog>
  )
}

export default CreateWorkflowDialog
