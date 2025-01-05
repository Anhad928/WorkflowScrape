import { waitFor } from '@/lib/helper/waitFor';
import { Enviornment, ExecutionEnviornment } from '@/types/executor';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '../task/LaunchBrowser';


export async function LaunchBrowserExecutor(
    enviornment: ExecutionEnviornment<typeof LaunchBrowserTask>
): Promise<boolean> {
    try {
        const websiteUrl = enviornment.getInput("Website Url");
        const browser = await puppeteer.launch({
            headless: false, // for testing
        });
        enviornment.setBrowser(browser);
        const page = await browser.newPage();
        await page.goto(websiteUrl);
        enviornment.setPage(page);
        return true;
    } catch (error: any) {
        enviornment.log.error(error.message);
        return false;
    }
}