import { ExecutionEnviornment } from '@/types/executor';
import { PageToHtmlTask } from '../task/PageToHtml';


export async function PageToHtmlExecutor(
    enviornment: ExecutionEnviornment<typeof PageToHtmlTask>
): Promise<boolean> {
    try {
        const html = await enviornment.getPage()!.content();
        enviornment.setOutput("HTML", html);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}