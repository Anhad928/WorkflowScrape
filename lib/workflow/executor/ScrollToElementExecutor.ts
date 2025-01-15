import { ExecutionEnviornment } from '@/types/executor';
import { FillInputTask } from '../task/FillInput';
import { waitFor } from '@/lib/helper/waitFor';
import { ClickElementTask } from '../task/ClickElement';
import { ScrollToElementTask } from '../task/ScrollToElement';


export async function ScrollToElementExecutor(
    enviornment: ExecutionEnviornment<typeof ScrollToElementTask>
): Promise<boolean> {
    try {
        const selector = enviornment.getInput("Selector")
        if (!selector) {
            enviornment.log.error("input -> selector not defined");
        }

        await enviornment.getPage()!.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (!element) {
                throw new Error(`Element with selector ${selector} not found`);
            }
            const top = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top })
        }, selector);

        await waitFor(5000);
        
        return true;
    } catch (error: any) {
        enviornment.log.error(error.message);
        return false;
    }
}