import { Separator } from '@/components/ui/separator'
import React from 'react'
import DesktopSidebar from '@/components/Sidebar'
import BreadcrumbHeader from '@/components/BreadcrumbHeader'
import { ModeToggle } from '@/components/ThemeModeToggle'
import { SignedIn, UserButton } from '@clerk/nextjs'

function layout({ children }: {children: React.ReactNode}) {
  return (
    <div className='flex h-screen'>
        <DesktopSidebar/>
      <div className='flex flex-col flex-1 min-h-screen'>
        <header className='flex items-center justify-between px-7 py-4 h-[50px] container'>
            <BreadcrumbHeader/>
            <div className='gap-1 flex items-center'></div>
            <ModeToggle/>
            <SignedIn>
                <UserButton></UserButton>
            </SignedIn>
        </header>
        <Separator/>
        <div className='overflow-auto'>
            <div className='flex-1 container py-4 text-accent-foreground'>
                {children}
            </div>
        </div>
      </div>
    </div>
  ) 
}

export default layout
