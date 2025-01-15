"use server";

import { PeriodToDateRange } from "@/lib/helper/dates";
import prisma from "@/lib/prisma";
import { Period } from "@/types/analytics";
import { auth } from "@clerk/nextjs/server";
import { eachDayOfInterval } from "date-fns";

export async function GetWorkflowExecutionStats(period: Period) {
    const { userId } =auth();
    if (!userId) {
        throw new Error ("unauthenticated");
    }

    const dateRange = PeriodToDateRange(period);
    const executions = await prisma.workflowExecution.findMany({
        where:{
            userId,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate,
            },
        },
    });

    const stats = eachDayOfInterval({start: dateRange.startDate, end:dateRange.endDate});

    return stats;
}