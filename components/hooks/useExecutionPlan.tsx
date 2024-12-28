import { useReactFlow } from "@xyflow/react"
import { useCallback } from "react";

const useExecutionPlan = () => {
    const {toObject} = useReactFlow();
    const generateExecutionPlan = useCallback(() => {}, []);
    return generateExecutionPlan;
};

export default useExecutionPlan;