import { ErrorHandler, HandlerInput } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { Logger } from '../services';

export class CustomErrorHandler implements ErrorHandler {

    
    public logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    public canHandle(): boolean {
        return true;
    }

    public handle(handlerInput: HandlerInput, error: Error): Response {
        console.log(error.message, error.name, error.stack);

        return handlerInput.responseBuilder
          .speak('Sorry, I can\'t understand the command. Please say again.')
          .withShouldEndSession(false)
          .getResponse();
    }
}