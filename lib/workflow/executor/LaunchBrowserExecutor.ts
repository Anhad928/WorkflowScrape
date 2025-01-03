import { waitFor } from '@/lib/helper/waitFor';
import { Enviornment } from '@/types/executor';
import puppeteer from 'puppeteer';


export async function LaunchBrowserExecutor(
    enviornment: Enviornment,
): Promise<boolean> {
    try {
        console.log("@@ENV", enviornment);
        const browser = await puppeteer.launch({
            headless: false, // for testing
        });
        await waitFor(3000);
        await browser.close();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}