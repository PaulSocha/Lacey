import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { IsIntent } from '../helpers/util';

export class FallbackIntentHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, 'AMAZON.FallbackIntent');
    }

    public handle(handlerInput: HandlerInput): Response {
        const speechText = 'Sorry! I did not catch that please ask that again.';
        const repromptSpeechText = 'What else I can I help you with today?';

        return handlerInput.responseBuilder
          .speak(speechText)
          .reprompt(repromptSpeechText)
          .getResponse();
    }
}
