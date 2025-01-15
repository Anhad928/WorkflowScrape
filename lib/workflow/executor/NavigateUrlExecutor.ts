import { ExecutionEnviornment } from '@/types/executor';
import { FillInputTask } from '../task/FillInput';
import { waitFor } from '@/lib/helper/waitFor';
import { ClickElementTask } from '../task/ClickElement';
import { NavigateUrlTask } from '../task/NavigateUrlTask';


export async function NavigateUrlExecutor(
    enviornment: ExecutionEnviornment<typeof NavigateUrlTask>
): Promise<boolean> {
    try {
        const url = enviornment.getInput("URL")
        if (!url) {
            enviornment.log.error("input -> URL not defined");
        }

        await enviornment.getPage()!.goto(url);
        enviornment.log.info(`Visited ${url}`);
        return true;
    } catch (error: any) {
        enviornment.log.error(error.message);
        return false;
    }
}