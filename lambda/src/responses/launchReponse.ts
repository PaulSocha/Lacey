import { HandlerInput } from "ask-sdk-core";
import { Response } from 'ask-sdk-model'; 

export async function LaunchReponse(handlerInput: HandlerInput, string: string = ''): Promise<Response>{
    
    const speak = 'Hello, I am here to help you with collecting your survey information for your health screening today. Are you ready to start?'
    const repromot = 'You can say start survey, if you are ready to begin.'
    return handlerInput.responseBuilder
        .speak(speak)
        .reprompt(repromot)
        .getResponse();    
    
}  