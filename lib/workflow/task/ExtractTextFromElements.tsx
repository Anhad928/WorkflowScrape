import { TaskParamType, TaskType } from "@/types/task";
import { CodeIcon, Flashlight, GlobeIcon, LucideProps, TextIcon } from "lucide-react";

export const ExtractTextFromElementTask = {
    type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
    label: "Get Text from HTML Element",
    icon: (props: LucideProps) => (
        <TextIcon className="stroke-rose-400" {...props} />
    ),
    isEntryPoint: false,
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
    ],
    outputs: [
        {
            name: "Extracted Text",
            type: TaskParamType.STRING,
        },
    ],
};