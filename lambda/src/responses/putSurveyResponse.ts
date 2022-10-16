import { HandlerInput } from 'ask-sdk-core';
import { IntentRequest, Response } from 'ask-sdk-model';
import * as dbHelper from '../helpers/responseDBHelper';



export async function PutSurveyResponse(handlerInput: HandlerInput, string: string = ''): Promise<Response>{

    console.log(`CompletedSurveyHandler: ${JSON.stringify(handlerInput)}`);
    try{
    const currentIntent = handlerInput.requestEnvelope.request as IntentRequest;
    const completedAnswer: string[] = [];
    for (const slotName of Object.keys(currentIntent.intent.slots!))  {
        const currentSlotResponse = currentIntent.intent.slots![slotName];
        if ( currentSlotResponse.resolutions && currentSlotResponse.resolutions.resolutionsPerAuthority![0] ) {
      if (currentSlotResponse.resolutions!.resolutionsPerAuthority![0].status.code === 'ER_SUCCESS_MATCH') {
          completedAnswer.push(currentSlotResponse.name, currentSlotResponse.value!);
       }
      }
    }
    console.log('This is the array of completed answers', completedAnswer);
    
    const responseQ1 = completedAnswer[3].toString();
    const reposneQ2 = completedAnswer[5].toString();
    const responseQ3 = completedAnswer[7].toString();
    const responseQ4 = completedAnswer[9].toString();
    const responseQ5 = completedAnswer[1].toString();
    dbHelper.addQA (responseQ1, reposneQ2, responseQ3, responseQ4, responseQ5, handlerInput.requestEnvelope.session!.user.userId);
    const speechText = 'Thank you for completing the survey. We will review your responses and a medical provider will see you shortly.';
    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  }catch (error) {
    console.log(error);
  }
    console.log('The intent is not catching the try statment');
    return handlerInput.responseBuilder
       .speak('An error has occured please try to again by saying start survey.')
       .reprompt('To start the survey, just say start survey.')
       .getResponse();
}
