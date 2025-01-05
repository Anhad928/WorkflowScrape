import { Log, LogCollector } from "@/types/log";

export function createLogCollector(): LogCollector {
    const logs: Log[] = [];
    const getAll = () => logs;
    return {
        getAll,
        info: (message:string) => logs.push({ level: "info", "message": message,
            "timestamp": new Date() 
        }),
        error: (message:string) => logs.push({ level: "error", "message": message,
            "timestamp": new Date() 
        }),
        warning: (message:string) => logs.push({ level: "warning", "message": message,
            "timestamp": new Date() 
        })
    };
}