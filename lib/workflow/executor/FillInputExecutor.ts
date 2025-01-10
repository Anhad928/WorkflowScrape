import { ExecutionEnviornment } from '@/types/executor';
import { FillInputTask } from '../task/FillInput';
import { waitFor } from '@/lib/helper/waitFor';


export async function FillInputExecutor(
    enviornment: ExecutionEnviornment<typeof FillInputTask>
): Promise<boolean> {
    try {
        const selector = enviornment.getInput("Selector")
        if (!selector) {
            enviornment.log.error("input -> selector not defined");
        }
        const value = enviornment.getInput("Value");
        if (!value) {
            enviornment.log.error("input -> value not defined");
        }

        await enviornment.getPage()!.type(selector, value);
        await waitFor(3000);
        return true;
    } catch (error: any) {
        enviornment.log.error(error.message);
        return false;
    }
}