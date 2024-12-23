"use client";

import { Workflow } from '@prisma/client';
import { Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import React from 'react'

import "@xyflow/react/dist/style.css";

function FlowEditor({workflow}: {workflow: Workflow}) {
    const[nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  return (
    <main className='h-full w-full'>
        <ReactFlow nodes={nodes} edges={edges}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}>
        <Controls position='top-left'/>
        </ReactFlow>
    </main>
  )
}

export default FlowEditor
