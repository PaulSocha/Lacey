import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { IsIntent } from '../helpers/util';
import { HelpReponse } from '../responses/helpHandlerResponse';

export class HelpIntentHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        return IsIntent(handlerInput, 'AMAZON.HelpIntent');
    }

    public async handle(handlerInput: HandlerInput): Promise<Response> {
        console.log(`Help Handler: ${JSON.stringify(handlerInput)}`);
        return HelpReponse(handlerInput, '');
    }
}
