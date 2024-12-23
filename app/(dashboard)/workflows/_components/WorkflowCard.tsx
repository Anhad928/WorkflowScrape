"use client"

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils';
import { WorkflowStatus } from '@/types/workflow';
import { Workflow } from '@prisma/client'
import { FileTextIcon, PlayIcon } from 'lucide-react';
import React from 'react'

function WorkflowCard({ workflow}: { workflow: Workflow}) {
    const isDraft = workflow.status === WorkflowStatus.DRAFT;
  return (<Card className='broder border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md
  dark:shado-primary/30'>
    <CardContent className='p-4 flex items-center justify-between h-[100px]'>
        <div className={cn("w-10 h-10 rounded-full flex items-center bg-red-500 justify-center")}>
            {isDraft ? 
            (<FileTextIcon className='h- 5 w-5'/> 
            ) : (
                <PlayIcon className='h-5 w-5 text-white'/>)}
        </div>
    </CardContent>

  </Card>);
}

export default WorkflowCard
