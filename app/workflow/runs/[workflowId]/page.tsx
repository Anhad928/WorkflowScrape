import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";
import Topbar from "../../_components/topbar/Topbar";

export default function Executionpage({params}:{params: {workflowId: string}}) {
    return (
    <div className="h-full w-full overflow-auto">
        <Topbar workflowId={params.workflowId}
        hideButtons
        title="All runs"
        subtitle="List of all your workflow runs">

        </Topbar>
        <ExecutionsTable workflowId={params.workflowId}/>
    </div>
)
}


async function ExecutionsTable({workflowId}: {workflowId: string}) {
    const executions = await GetWorkflowExecutions(workflowId);
    if (!executions) {
        return <div>No executions found</div>
    }

    return <pre>{JSON.stringify(executions, null, 4)}</pre>
}