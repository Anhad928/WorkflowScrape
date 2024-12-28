import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, Flashlight, GlobeIcon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
    type: TaskType.PAGE_TO_HTML,
    label: "Get HTML from Page",
    icon: (props: LucideProps) => (
        <CodeIcon className="stroke-rose-400" {...props} />
    ),
    isEntryPoint: false,
    credits: 2,
    inputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        },
    ],
    outputs: [
        {
            name: "HTML",
            type: TaskParamType.STRING,
        },
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
        },
    ],
} satisfies WorkflowTask;