import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, Flashlight, GlobeIcon, LucideProps, TextIcon } from "lucide-react";

export const ExtractTextFromElementTask = {
    type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
    label: "Get Text from Element",
    icon: (props: LucideProps) => (
        <TextIcon className="stroke-rose-400" {...props} />
    ),
    isEntryPoint: false,
    credits: 2,
    inputs: [
        {
            name: "HTML",
            type: TaskParamType.STRING,
            required: true,
            variant: "textarea",
        },
        {
            name: "Selector",
            type: TaskParamType.STRING,
            required: true,
        }
    ] as const,
    outputs: [
        {
            name: "Extracted Text",
            type: TaskParamType.STRING,
        },
    ] as const,
} satisfies WorkflowTask;