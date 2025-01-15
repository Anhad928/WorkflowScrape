import { waitFor } from '@/lib/helper/waitFor';
import { Enviornment, ExecutionEnviornment } from '@/types/executor';
import puppeteer from 'puppeteer';
import { LaunchBrowserTask } from '../task/LaunchBrowser';

const BROWSER_WS = "wss://brd-customer-hl_ec97eede-zone-scrape_flow_browser:a9pi9u3c0535@brd.superproxy.io:9222";
export async function LaunchBrowserExecutor(
    enviornment: ExecutionEnviornment<typeof LaunchBrowserTask>
): Promise<boolean> {
    try {
        const websiteUrl = enviornment.getInput("Website Url");
        const browser = await puppeteer.connect({
            browserWSEndpoint: BROWSER_WS,
        })
        enviornment.log.info("Browser started successfully");
        enviornment.setBrowser(browser);
        const page = await browser.newPage();
        page.setViewport({ width: 1440, height: 900 });
        await page.goto(websiteUrl);
        enviornment.setPage(page);
        enviornment.log.info(`Opened page at: ${websiteUrl}`);
        
        return true;
    } catch (error: any) {
        enviornment.log.error(error.message);
        return false;
    }
}