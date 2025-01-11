import { ExecutionEnviornment } from '@/types/executor';
import { FillInputTask } from '../task/FillInput';
import { waitFor } from '@/lib/helper/waitFor';
import { ClickElementTask } from '../task/ClickElement';
import { WaitForElementTask } from '../task/WaitForElement';


export async function WaitForElementExecutor(
    enviornment: ExecutionEnviornment<typeof WaitForElementTask>
): Promise<boolean> {
    try {
        const selector = enviornment.getInput("Selector")
        if (!selector) {
            enviornment.log.error("input -> selector not defined");
        }

        const visibility = enviornment.getInput("Visibility");
        if (!visibility) {
            enviornment.log.error("input -> visibility not defined");
        }

        await enviornment.getPage()!.waitForSelector(selector, {
            visible: visibility === "visible",
            hidden: visibility === "hidden",
        })
        enviornment.log.info(`Element ${selector} is ${visibility}`)
        return true;
    } catch (error: any) {
        enviornment.log.error(error.message);
        return false;
    }
}