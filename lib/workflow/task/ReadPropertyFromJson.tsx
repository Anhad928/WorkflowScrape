import { TaskParamType, TaskType } from "@/types/task";
import { WorkflowTask } from "@/types/workflow";
import { CodeIcon, FileJson2Icon, Flashlight, GlobeIcon, LucideProps, MousePointerClick, TextIcon } from "lucide-react";

export const ReadPropertyFromJsonTask = {
    type: TaskType.READ_PROPERTY_FROM_JSON,
    label: "Read Property From JSON",
    icon: (props) => <FileJson2Icon className="stroke-orange-400" {...props} />
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
        }
    ] as const,
    outputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
        },
    ] as const,
} satisfies WorkflowTask;