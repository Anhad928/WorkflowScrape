import { TaskType } from "@/types/task";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";
import { ExecutionEnviornment } from "@/types/executor";
import { WorkflowTask } from "@/types/workflow";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";

type ExecutorFn<T extends WorkflowTask> = (enviornment: ExecutionEnviornment<T>) => Promise<boolean>;

type RegistryType = {
    [K in TaskType]: ExecutorFn<WorkflowTask & { type: K }>;
}
export const ExecutorRegistry: RegistryType = {
    LAUNCH_BROWSER: LaunchBrowserExecutor,
    PAGE_TO_HTML: PageToHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
};
