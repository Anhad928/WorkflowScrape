"use client";

import { GetWorkflowExecutions } from '@/actions/workflows/getWorkflowExecutions';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

type InitialDataType = Awaited<ReturnType<typeof GetWorkflowExecutions>>;


export default function ExecutionsTable({
    workflowId,
    initialData
}: {
    workflowId: string;
    initialData: InitialDataType
}) {

    const query = useQuery({
        queryKey: ["executions", workflowId],
        initialData,
        queryFn: () => GetWorkflowExecutions(workflowId),
        refetchInterval: 5000,
    });
  return (
    <pre>
        {JSON.stringify(query.data, null, 4)}
    </pre>
  )
}
