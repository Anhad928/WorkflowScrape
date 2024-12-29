import { FlowToExecutionPlan, FlowToExecutionPlanValidationError } from "@/lib/workflow/executionPlan";
import { AppNode } from "@/types/appNode";
import { useReactFlow } from "@xyflow/react"
import { useCallback } from "react";
import useFlowValidation from "./useFlowValidation";
import { toast } from "sonner";

const useExecutionPlan = () => {
    const {toObject} = useReactFlow();
    const { setInvalidInputs, clearErrors } = useFlowValidation();

    const handleError = useCallback((error: any) => {
        switch (error.type){
            case FlowToExecutionPlanValidationError.NO_ENTRY_POINT: 
            toast.error("No entry point found");
        }
    }, []);

    const generateExecutionPlan = useCallback(() => {
        const {nodes, edges} = toObject();
        const {executionPlan, error} = FlowToExecutionPlan(nodes as AppNode[], edges);

        if (error){
            handleError(error);
            return null;
        }
        return executionPlan;
    }, [toObject]);
    return generateExecutionPlan;
};

export default useExecutionPlan;