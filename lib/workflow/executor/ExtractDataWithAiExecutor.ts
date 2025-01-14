import { ExecutionEnviornment } from '@/types/executor';
import { FillInputTask } from '../task/FillInput';
import { waitFor } from '@/lib/helper/waitFor';
import { ClickElementTask } from '../task/ClickElement';
import { ExtractDataWithAITask } from '../task/ExtractDataWithAI';
import prisma from '@/lib/prisma';
import { symmetricDecrypt } from '@/lib/encryption';
import { env } from 'process';


export async function ExtractDataWithAiExecutor(
    enviornment: ExecutionEnviornment<typeof ExtractDataWithAITask>
): Promise<boolean> {
    try {
        const credentials = enviornment.getInput("Credentials")
        if (!credentials) {
            enviornment.log.error("input -> Credentials not defined");
        }

        const prompt = enviornment.getInput("Prompt")
        if (!prompt) {
            enviornment.log.error("input -> Prompt not defined");
        }

        const content = enviornment.getInput("Content")
        if (!content) {
            enviornment.log.error("input -> Content not defined");
        }

        // Get credentials form DB
        const credential = await prisma.credential.findUnique({
            where: { id: credentials },

        });

        if (!credential) {
            enviornment.log.error("Credentials not found");
            return false;
        }

        const plainCredentialValue = symmetricDecrypt(credential.value);
        if (!plainCredentialValue) {
             enviornment.log.error("Failed to decrypt credentials");
            return false; 
        }
        const mockExtractedData = {
            usernameSelector: "#username",
            passwordSelector: "#password",
            loginSelector: "body > div > form > input.btn.btn-primary",
        }
        enviornment.setOutput("Extracted data",JSON.stringify(mockExtractedData));
        return true;
    } catch (error: any) {
        enviornment.log.error(error.message);
        return false;
    }
}