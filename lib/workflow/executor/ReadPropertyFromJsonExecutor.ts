import { ExecutionEnviornment } from '@/types/executor';
import { FillInputTask } from '../task/FillInput';
import { waitFor } from '@/lib/helper/waitFor';
import { ClickElementTask } from '../task/ClickElement';


export async function ClickElementExecutor(
    enviornment: ExecutionEnviornment<typeof ClickElementTask>
): Promise<boolean> {
    try {
        const selector = enviornment.getInput("Selector")
        if (!selector) {
            enviornment.log.error("input -> selector not defined");
        }

        await enviornment.getPage()!.click(selector);
        await waitFor(3000);
        return true;
    } catch (error: any) {
        enviornment.log.error(error.message);
        return false;
    }
}