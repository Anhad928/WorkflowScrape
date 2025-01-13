import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { BrainIcon, CodeIcon, Flashlight, GlobeIcon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const ExtractDataWithAITask = {
    type: TaskType.EXTRACT_DATA_WITH_AI,
    label: "Click Element",
    icon: (props) => <BrainIcon className="stroke-rose-400" {...props} />,
    isEntryPoint: false,
    credits: 4,
    inputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        },
        {
            name: "Selector",
            type: TaskParamType.STRING,
            required: true,
        }
    ] as const,
    outputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
        },
    ] as const,
} satisfies WorkflowTask;