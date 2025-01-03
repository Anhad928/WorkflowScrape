import { Browser } from "puppeteer";

export type Enviornment = {
    browser?: Browser;
    // phases with nodeId/taskId as key

    phases: Record<
    string, // key: PhaseId
    {
        inputs: Record<string, string>,
        outputs: Record<string, string>,
    }
    >;
};


export type ExecutionEnviornment = {
    getInput(name: string): string;
}