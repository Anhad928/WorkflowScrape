import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";
import Topbar from "../../_components/topbar/Topbar";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
import { waitFor } from "@/lib/helper/waitFor";

export default function Executionpage({params}:{params: {workflowId: string}}) {
    return (
    <div className="h-full w-full overflow-auto">
        <Topbar workflowId={params.workflowId}
        hideButtons
        title="All runs"
        subtitle="List of all your workflow runs">

        </Topbar>
        <Suspense fallback={
            <div className="flex h-full w-full items-center justify-center">
                <Loader2Icon size={30} className="animate-spin stroke-primary" />
            </div>
        }>
            <ExecutionsTable workflowId={params.workflowId}/>
        </Suspense>
    </div>
)
}


async function ExecutionsTable({workflowId}: {workflowId: string}) {
    await waitFor(4000);
    const executions = await GetWorkflowExecutions(workflowId);
    if (!executions) {
        return <div>No executions found</div>
    }

    return <pre>{JSON.stringify(executions, null, 4)}</pre>
}