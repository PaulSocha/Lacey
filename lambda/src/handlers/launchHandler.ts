import { HandlerInput } from "ask-sdk-core";
import { RequestHandler } from "ask-sdk-core";
import { Response} from 'ask-sdk-model';
import { IsType } from "../helpers";
import { LaunchReponse } from "../responses/launchReponse";

export class LaunchRequestHandler implements RequestHandler {
    public canHandle(handlerInput: HandlerInput) { 
        return IsType(handlerInput, 'LaunchRequest');
    }
    public async handle(handlerInput: HandlerInput): Promise<Response>{
        return LaunchReponse(handlerInput, '')
    }
}