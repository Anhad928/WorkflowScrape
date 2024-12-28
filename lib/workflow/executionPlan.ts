import { AppNode } from "@/types/appNode";
import { WorkflowExecutionPlan, WorkflowExecutionPlanPhase } from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { TaskRegistry } from "./task/registry";

type FlowToExecutionPlanType = {
    executionPlan?: WorkflowExecutionPlan;
};

export function FlowToExecutionPlan(
    nodes: AppNode[], 
    edges: Edge[]
): FlowToExecutionPlanType {

    const entryPoint = nodes.find(
        node => TaskRegistry[node.data.type].isEntryPoint
    );

    if (!entryPoint){
        throw new Error("TODO: HANDLE THIS ERROR");
    }

    const planned = new Set<string>();
    const executionPlan: WorkflowExecutionPlan = [
        {
            phase: 1,
            nodes: [entryPoint],
    },
];

    for (let phase = 2;
        phase <= nodes.length || planned.size < nodes.length; phase++
    ){
        const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] };
        for (const currentNode of nodes){
            if (planned.has(currentNode.id)) {
                continue;
            }
            const invalidInputs = getInvalidInputs(currentNode, edges, planned);
            if (invalidInputs.length >0){
                const incomers = getIncomers(currentNode, nodes, edges);
                if (incomers.every(incomer => planned.has(incomer.id))){
                    // If all incoming incomers/edges are planned and these are still invalid inputs,
                    // this means that this particular node has an invalid input.
                    // which means that the workflow is invalid.
                    console.error("invalid inputs", currentNode.id, invalidInputs);
                    throw new Error("TODO: HANDLE THIS ERROR 1");
                } else {
                    // let's skip this node for now
                    continue;
                }
            }
            nextPhase.nodes.push(currentNode);
            planned.add(currentNode.id);
        }
    }

    return {executionPlan};
}

function getInvalidInputs(node: AppNode, edges:Edge[], planned: Set<string>){
    const invalidInputs =[];
    const inputs = TaskRegistry[node.data.type].inputs;
    for ( const input of inputs){
        const inputValue = node.data.inputs[input.name];
        const inputValueProvided = inputValue?.length > 0;
    }
        
    
}