import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { IsIntent } from '../helpers/util';

export class CancelAndStopIntentHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, 'AMAZON.CancelIntent') || IsIntent(handlerInput, 'AMAZON.StopIntent');
    }

    public handle(handlerInput: HandlerInput): Response {
        const speechText = 'Thank you. If you need anything else please let me know.';

        return handlerInput.responseBuilder
          .speak(speechText)
          .withShouldEndSession(true)
          .getResponse();
    }
}
