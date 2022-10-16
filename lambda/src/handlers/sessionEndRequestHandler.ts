import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, SessionEndedRequest } from 'ask-sdk-model';
import { IsType } from '../helpers/util';
import { Logger } from '../services';

export class SessionEndedRequestHandler implements RequestHandler {

    public logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }


    public canHandle(handlerInput: HandlerInput): boolean {
        return IsType(handlerInput, 'SessionEndedRequest');
    }

    public handle(handlerInput: HandlerInput): Response {
        console.log(`Session ended with reason: ${(handlerInput.requestEnvelope.request as SessionEndedRequest).reason}`);

        return handlerInput.responseBuilder.speak('Thank you. If you need anything else please let me know.').getResponse();
    }
}
