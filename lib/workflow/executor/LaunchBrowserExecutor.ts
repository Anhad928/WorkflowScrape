import { waitFor } from '@/lib/helper/waitFor';
import { Enviornment, ExecutionEnviornment } from '@/types/executor';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '../task/LaunchBrowser';


export async function LaunchBrowserExecutor(
    enviornment: ExecutionEnviornment<typeof LaunchBrowserTask>
): Promise<boolean> {
    try {
        const websiteUrl = enviornment.getInput("Website Url");
        console.log("@@WEBSITE URL", websiteUrl);
        const browser = await puppeteer.launch({
            headless: true, // for testing
        });
        enviornment.setBrowser(browser);
        const page = await browser.newPage();
        await page.goto(websiteUrl);
        enviornment.setPage(page);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}