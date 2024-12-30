import Topbar from "@/app/workflow/_components/topbar/Topbar";
import { waitFor } from "@/lib/helper/waitFor";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default function ExecutionViewersPage({
    params,
} : {
    params: {
        executionId: string;
        workflowId: string;
    }
}){
    return(
        <div className="flex flex-col h-screen w-full overflow-hidden">
            <Topbar workflowId={params.workflowId}
            title ="Workflow run details"
            subtitle = {`Run ID: ${params.executionId}`}
            hideButtons
            />
            <section className="flex h-full overflow-auto">
                <Suspense fallback={
                    <div className="flex w-full items-center justify-center">
                        <Loader2Icon className="h-10 w-10 animate-spin stroke-primary"/>
                    </div>
                }>
                    <ExecutionViewersWrapper executionId={params.executionId} />
                </Suspense>
            </section>
        </div>
    );
}


async function ExecutionViewersWrapper({
    executionId,
}: {
    executionId: string;
}) {
    await waitFor(5000 );
    return (
        <div>
            Wrapper
        </div>
    )
}