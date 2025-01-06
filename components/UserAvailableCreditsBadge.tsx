"use client";

import { GetAvailableCredits } from '@/actions/billing/getAvailableCredits';
import { useQuery } from '@tanstack/react-query';
import { CoinsIcon, Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

function UserAvailableCreditsBadge() {
    const query = useQuery({
        queryKey: ["user-available-credits"],
        queryFn: GetAvailableCredits,
        refetchInterval: 30 * 1000, // 30 seconds
    })
  return (
    <Link href={"/billing"}>
        <CoinsIcon size={20} className='text-primary'/>
        <span className='font-semibold capitalize'>
            {query.isLoading && <Loader2Icon className='w-4 h-4 animate-spin'/>}
            {!query.isLoading && query.data && query.data}
            {!query.isLoading && !query.data && "-"}
        </span>
    </Link>
  )
}

export default UserAvailableCreditsBadge
