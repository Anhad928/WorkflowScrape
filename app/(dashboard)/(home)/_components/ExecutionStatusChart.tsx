"use client";

import { GetWorkflowExecutionStats } from '@/actions/analytics/getWorkflowExecutionStats';
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader, 
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Layers2 } from 'lucide-react';

type ChartData = Awaited<ReturnType<typeof GetWorkflowExecutionStats>>
export default function ExecutionStatusChart({ data }: { data: ChartData }) {
  return (
    <Card>
        <CardHeader>
        <CardTitle className='text-2xl font-bold flex items-center gap-2'>
          <Layers2 className='w-6 h-6 text-primary'/>
          Workflow execution status
          </CardTitle>
          <CardDescription>
            Daily number of successfull and failed workflow executions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre>{JSON.stringify(data, null, 4)}</pre>
        </CardContent>
    </Card>
  )
}
