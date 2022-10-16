import { HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response } from 'ask-sdk-model';
import { IsIntentWithCompleteDialog } from '../helpers/util';
import { PutSurveyResponse } from '../responses/putSurveyResponse'

export class CompletedSurveyHandler implements RequestHandler {
    public canHandle(handlerInput: HandlerInput): boolean{
        return IsIntentWithCompleteDialog(handlerInput, 'SurveyIntent');
    }

    public async handle(handlerInput: HandlerInput): Promise<Response>{
        console.log(`CompletedSurveyHandler: ${JSON.stringify(handlerInput)}`);
        return PutSurveyResponse(handlerInput, '')
    }
  }

