"use client";

import TooltipWrapper from '@/components/TooltipWrapper';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import React from 'react'

export default function Topbar() {
  return (
    <header className='flex p-2 border-p-2 border-seprate justify-between w-full h-[60px] sticky top-0
    bg-background z-10'>
        <div className='flex gap-1 flex-1'>
            <TooltipWrapper content = "Back">
                <Button variant={"ghost"} size={"icon"} onClick={() => Router.back()}>
                    <ChevronLeftIcon size={20} />
                </Button>
            </TooltipWrapper>
        </div>
    </header>
  )
}
