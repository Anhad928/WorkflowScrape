"use client";

import { Button } from "@/components/ui/button";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath } from "@xyflow/react";

export default function DeletableEdge(props: EdgeProps){
    const [edgePath, labelX, labelY] =getSmoothStepPath(props)
    return (
        <>
        <BaseEdge path={edgePath} markerEnd={props.markerEnd} 
        style={props.style}
        />
        <EdgeLabelRenderer>
            <div style={{
                position: "absolute",
                transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                pointerEvents: "all",
            }}>
                <Button variant={"outline"} size={"icon"} className="w-5 h-5 border cursor-pointer rounded-full text-xs leading-none hover:shadow-lg">X</Button>
            </div>
        </EdgeLabelRenderer>
        </>
    )
}