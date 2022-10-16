import { HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';

export async function HelpReponse(handlerInput: HandlerInput, string: string = ''): Promise<Response>{

    const speechText = 'My purpose is to help complete this five question health screening. If you are ready to start just say begin survey.';
    const reprompt = 'Would you like to start the survey?';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(reprompt)
      .getResponse();

}