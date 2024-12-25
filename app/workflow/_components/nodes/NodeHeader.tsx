"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TakeRegistry } from '@/lib/workflow/task/registry';
import { TaskType } from '@/types/task';
import { CoinsIcon, GripVerticalIcon } from 'lucide-react';
import React from 'react'

function NodeHeader({ taskType }: { taskType: TaskType }) {
    const task = TakeRegistry[taskType]
  return (
    <div className='flex items-center gap-2 p-2'>
      <task.icon size={16} />
      <div className='flex justify-between items-center w-full'>
        <p className='text-xs font-bold uppercase text-muted-foreground'>
            {taskType}
        </p>
        <div className='flex gap-1 items-center'>
            {task.isEntryPoint && <Badge>Entry Point</Badge>}
            <Badge className='gap-2 flex items-center text-xs'>
                <CoinsIcon size={16}/>
                TODO
            </Badge>
            <Button variant={"ghost"} size={"icon"} className='drag-handle cursor-grab'>
                <GripVerticalIcon size={20}/>
            </Button>
        </div>
      </div>
    </div>
  )
}

export default NodeHeader