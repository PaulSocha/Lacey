import { HandlerInput} from 'ask-sdk';
import { IntentRequest, Response } from 'ask-sdk-model';

const REQUIRED_SLOTS = [
    { slot: 'QuestionOne', type: 'yesno' },
    { slot: 'QuestionTwo', type: 'yesno' },
    { slot: 'QuestionThree', type: 'rating' },
    { slot: 'QuestionFour', type: 'yesno' },
    { slot: 'QuestionFive', type: 'rating'}
];

export async function InProgressReponse(this: any, handlerInput: HandlerInput, string: string = ''): Promise<Response>{

    console.log(`InProgressSurveyHandler: ${JSON.stringify(handlerInput)}`);
    

    try {
                console.log('Survey has started');
                console.log(handlerInput.requestEnvelope.request);
                const currentIntent = handlerInput.requestEnvelope.request as IntentRequest;
                const currentSlot = currentIntent.intent.slots;
                for (const slotName of Object.keys(currentSlot!)) {
                  const currentSlotResponse = currentIntent.intent!.slots![slotName];
                  if (currentSlotResponse.confirmationStatus !== 'CONFIRMED'
                  && currentSlotResponse.resolutions
                  && currentSlotResponse.resolutions.resolutionsPerAuthority![0]) {
                    if (currentSlotResponse.resolutions.resolutionsPerAuthority![0].status.code === 'ER_SUCCESS_MATCH'){
                      if (currentSlotResponse.resolutions.resolutionsPerAuthority![0].values.length > 1) {
                        this.prompt = 'Which would you like';
                        const size = currentSlotResponse.resolutions!.resolutionsPerAuthority![0].values.length;
                        currentSlotResponse.resolutions.resolutionsPerAuthority![0].values
                           .forEach((element, index) => {
                             this.prompt += `${(index === size - 1) ? ' or ' : ' '} ${element.value.name}`;
                          });
                        this.prompt += '?';
                        return handlerInput.responseBuilder
                        .speak(this.prompt)
                        .reprompt(this.prompt)
                        .addElicitSlotDirective(currentSlotResponse.name)
                        .getResponse();

                      }
                  } else if ( currentSlotResponse.resolutions.resolutionsPerAuthority![0].status.code === 'ER_SUCCESS_NO_MATCH'){
                    this.prompt = 'Please ';

                    REQUIRED_SLOTS.forEach((element) => {
                      if (element.slot === currentSlotResponse.name) {
                         if (element.type === 'rating'){
                           this.prompt +=  `choose a number between 1 and 5 `;
                         } else if (element.type === 'yesno'){
                           this.prompt += 'answer yes or no';
                         }
                      }
                    });

                    return handlerInput.responseBuilder
                    .speak(this.prompt)
                    .reprompt(this.prompt)
                    .addElicitSlotDirective(currentSlotResponse.name)
                    .getResponse();

                  }
                 }
                }
                return handlerInput.responseBuilder
                .addDelegateDirective(currentIntent.intent)
                .getResponse();
      } catch (error){
        console.log(error);
      }
        return handlerInput.responseBuilder
      .speak('What else can I help you with today?')
      .reprompt('Is there anything else I can help you with today?')
      .getResponse();
}
  
