export type Enviornment = {

    // phases with PhaseId as key

    phases: {
        [key:string]: {
            inputs: Record<string, string>;
            outputs: Record<string, string>;
        };
    };
};