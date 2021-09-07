import { HandlerInput } from "ask-sdk-core";
import { Response } from 'ask-sdk-model'; 

export async function LaunchReponse(handlerInput: HandlerInput, string: string = ''): Promise<Response>{
    
    const speak = 'Hello, what can I help with you today?'
    const repromot = 'Is there anything I can help with today?'
    return handlerInput.responseBuilder
        .speak(speak)
        .reprompt(repromot)
        .getResponse();    
    
}  