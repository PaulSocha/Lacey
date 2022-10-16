import { HandlerInput, RequestHandler } from 'ask-sdk';
import { Response } from 'ask-sdk-model';
import { IsIntentWithIncompleteDialog } from '../helpers/util';
import { InProgressReponse } from '../responses/getSurveyResponse';

export class InProgressSurveyHandler implements RequestHandler {
    public prompt: string | undefined;
    public canHandle(handlerInput: HandlerInput): boolean{
        return IsIntentWithIncompleteDialog(handlerInput, 'SurveyIntent');
    }

  public async handle(handlerInput: HandlerInput): Promise<Response>{

    console.log(`In Progress Survey: ${JSON.stringify(handlerInput)}`); 
    return InProgressReponse(handlerInput, '')
  }
}