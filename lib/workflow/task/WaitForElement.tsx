import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, EyeIcon, Flashlight, GlobeIcon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const ClickElementTask = {
    type: TaskType.WAIT_FOR_ELEMENT,
    label: "Wait For Element",
    icon: (props) => <EyeIcon className="stroke-amber-400" {...props} />
    ,
    isEntryPoint: false,
    credits: 1,
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
        },
        {
            name: "Visibility",
            type: TaskParamType.SELECT,
            required: true,
            options: [
                {label: "Visible", value: "visible"},
                {label: "Hidden", value: "hidden"},
            ],
        },
    ] as const,
    outputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
        },
    ] as const,
} satisfies WorkflowTask;