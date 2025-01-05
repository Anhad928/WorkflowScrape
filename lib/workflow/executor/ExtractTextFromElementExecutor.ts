import { ExecutionEnviornment } from '@/types/executor';
import { ExtractTextFromElementTask } from '../task/ExtractTextFromElements';
import * as cheerio from 'cheerio';

export async function ExtractTextFromElementExecutor(
    enviornment: ExecutionEnviornment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
    try {
        const selector = enviornment.getInput("Selector");
        if (!selector) {
            console.log("Selector not defined");
            return false;
        }
        const html = enviornment.getInput("HTML");
        if (!html) {
            return false;
        }

        const $ = cheerio.load(html);
        const element = $(selector);

        if (!element){
            console.error("Element not found");
            return false;
        }

        const extractedText = $.text(element);
        if (!extractedText){
            console.error("Element has no text");
            return false;
        }

        enviornment.setOutput("Extracted Text", extractedText);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}