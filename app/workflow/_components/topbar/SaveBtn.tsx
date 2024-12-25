"use client";

import { Button } from '@/components/ui/button';
import { useReactFlow } from '@xyflow/react';
import { CheckIcon } from 'lucide-react';
import React from 'react'

function SaveBtn({ workflowId }: { workflowId: string}) {
    const { toObject } = useReactFlow();

  return (
    <Button variant={"outline"} className='flex items-center gap-2' onClick={() => {
        console.log("@FLOW", workflowId);
    }}
    >
        <CheckIcon size={16} className='stroke-green-400' />
        Save
    </Button>
  )
}

export default SaveBtn
