import { ExecutionEnviornment } from '@/types/executor';
import { ExtractTextFromElementTask } from '../task/ExtractTextFromElements';


export async function ExtractTextFromElementExecutor(
    enviornment: ExecutionEnviornment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
    try {
        const selector = enviornment.getInput("Selector");
        if (!selector) {
            return false;
        }
        const html = enviornment.getInput("HTML");
        if (!html) {
            return false;
        }

        
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}