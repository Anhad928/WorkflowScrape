import { ExecutionPhase } from "@prisma/client";

type Phase = Pick<ExecutionPhase, "creditsCost">;
export function GetPhasesTotalCost(phase: Phase[]){}