import { Browser, Page } from "puppeteer";
import { WorkflowTask } from "./workflow";

export type Enviornment = {
    browser?: Browser;
    page?: Page;
    // phases with nodeId/taskId as key

    phases: Record<
    string, // key: PhaseId
    {
        inputs: Record<string, string>,
        outputs: Record<string, string>,
    }
    >;
};


export type ExecutionEnviornment<T extends WorkflowTask> = {
    getInput(name: T["inputs"][number]["name"]): string;

    getBrowser(): Browser | undefined;   
    setBrowser(browser: Browser) : void;

    getPage(): Page | undefined;
    setPage(page: Page): void;
}