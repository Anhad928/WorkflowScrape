import { ExecutionEnviornment } from '@/types/executor';
import { FillInputTask } from '../task/FillInput';
import { waitFor } from '@/lib/helper/waitFor';
import { ClickElementTask } from '../task/ClickElement';
import { ReadPropertyFromJsonTask } from '../task/ReadPropertyFromJson';


export async function ReadPropertyFromJsonExecutor(
    enviornment: ExecutionEnviornment<typeof ReadPropertyFromJsonTask>
): Promise<boolean> {
    try {
        const jsonData = enviornment.getInput("JSON")
        if (!jsonData) {
            enviornment.log.error("input -> JSON not defined");
        }
        const propertyName = enviornment.getInput("Property name")
        if (!propertyName) {
            enviornment.log.error("input -> Property name not defined");
        }
        
        const json  = JSON.parse(jsonData);
        const propertyValue = json[propertyName];
        if (propertyValue === undefined) {
            enviornment.log.error("proper†y not found");
            return false;
        }

        enviornment.setOutput("Property value", propertyValue);
        return true;
    } catch (error: any) {
        enviornment.log.error(error.message);
        return false;
    }
}