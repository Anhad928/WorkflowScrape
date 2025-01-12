import { ExecutionEnviornment } from '@/types/executor';
import { FillInputTask } from '../task/FillInput';
import { waitFor } from '@/lib/helper/waitFor';
import { ClickElementTask } from '../task/ClickElement';
import { DeliverViaWebhookTask } from '../task/DeliverViaWebhook';


export async function DelviverViaWebhookExecutor(
    enviornment: ExecutionEnviornment<typeof DeliverViaWebhookTask>
): Promise<boolean> {
    try {
        const targetUrl = enviornment.getInput("Target URL")
        if (!targetUrl) {
            enviornment.log.error("input -> targetUrl not defined");
        }

        const body = enviornment.getInput("Body")
        if (!body) {
            enviornment.log.error("input -> body not defined");
        }

        const response = await fetch(targetUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });
        const statusCode = response.status;
        if ( statusCode != 200) {
            enviornment.log.error(`status code: ${statusCode}`);
            return false;
        }

        const responseBody = await response.json();
        enviornment.log.info(JSON.stringify(responseBody, null, 4));
        return true;
    } catch (error: any) {
        enviornment.log.error(error.message);
        return false;
    }
}