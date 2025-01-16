"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditsPack } from '@/types/billing';
import { CoinsIcon } from 'lucide-react';
import React from 'react'

export default function CreditsPurchase() {
  return (
    <Card>
        <CardHeader>
            <CardTitle className='text-2xl font-bold flex items-center gap-2'>
                <CoinsIcon className='h-6 w-6 text-primary'/>
                Purchase Credits
                </CardTitle>
                <CardDescription>
                    Select the number of credits you want to purchase
                </CardDescription>
        </CardHeader>
        <CardContent>
            {CreditsPack.map((pack) => (
                <div key={pack.id}>{pack.name}</div>
            ))}
        </CardContent>
    </Card>
  )
}
