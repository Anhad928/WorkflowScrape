"use client";

import { Workflow } from '@prisma/client';
import { ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import React from 'react'

function FlowEditor({workflow}: {workflow: Workflow}) {
    const[nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  return (
    <main className='h-full w-full'>
        <ReactFlow>

        </ReactFlow>
    </main>
  )
}

export default FlowEditor
