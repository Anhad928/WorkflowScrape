import { ExecutionEnviornment } from '@/types/executor';
import { PageToHtmlTask } from '../task/PageToHtml';


export async function PageToHtmlExecutor(
    enviornment: ExecutionEnviornment<typeof PageToHtmlTask>
): Promise<boolean> {
    try {
        const browser = enviornment.getBrowser();
        enviornment.getInput
        console.log("@@WEBSITE URL", websiteUrl);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}