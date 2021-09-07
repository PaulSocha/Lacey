import { HandlerInput } from "ask-sdk-core";
import { RequestHandler } from "ask-sdk-core";
import { Response } from "ask-sdk-model"; 
import { IsType } from "../helpers";
import { GetIntentReponse } from "../responses/IntentResponse";

export class IntentRequestHandler implements RequestHandler { 
    public canHandle(handlerInput: HandlerInput) { 
        return IsType(handlerInput, 'IntentRequest');
    }
    public async handle(handlerInput: HandlerInput): Promise<Response>{
        return GetIntentReponse(handlerInput, '')
        
    }
}