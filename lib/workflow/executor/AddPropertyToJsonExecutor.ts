import { ExecutionEnviornment } from '@/types/executor';
import { FillInputTask } from '../task/FillInput';
import { waitFor } from '@/lib/helper/waitFor';
import { ClickElementTask } from '../task/ClickElement';
import { ReadPropertyFromJsonTask } from '../task/ReadPropertyFromJson';
import { AddPropertyToJsonTask } from '../task/AddPropertyFromJson';


export async function AddPropertyToJsonExecutor(
    enviornment: ExecutionEnviornment<typeof AddPropertyToJsonTask>
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
        const propertyValue = enviornment.getInput("Property value")
        if (!propertyValue) {
            enviornment.log.error("input -> Property name not defined");
        }
        
        const json  = JSON.parse(jsonData);
        json[propertyName] = propertyValue;
        

        enviornment.setOutput("Update JSON", JSON.stringify(json));
        return true;
    } catch (error: any) {
        enviornment.log.error(error.message);
        return false;
    }
}