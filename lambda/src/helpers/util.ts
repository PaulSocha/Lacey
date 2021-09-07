import { HandlerInput } from 'ask-sdk';
import { IntentRequest, Response } from 'ask-sdk-model';
import * as AWS from 'aws-sdk';
import {
    MatchedSlotValue,
    RequestAttributes,
    RequestTypes,
    SessionAttributes,
    SlotValues,
    UnmatchedSlotValue,
} from '../models';

export function IsIntent(handlerInput: HandlerInput, ...intents: string[]): boolean {
    if (handlerInput.requestEnvelope.request.type === 'IntentRequest' || handlerInput.requestEnvelope.request.type === 'CanFulfillIntentRequest') {
        for (const intent of intents) {
            if (handlerInput.requestEnvelope.request.intent.name === intent) {
                return true;
            }
        }
    }
    return false;
}

export function IsType(handlerInput: HandlerInput, ...types: string[]): boolean {
    for (const type of types) {
        if (handlerInput.requestEnvelope.request.type === type) {
            return true;
        }
    }
    return false;
}


export function GetRequestAttributes(handlerInput: HandlerInput): RequestAttributes {
    return handlerInput.attributesManager.getRequestAttributes() as RequestAttributes;
}

export function GetSessionAttributes(handlerInput: HandlerInput): SessionAttributes {
    return handlerInput.attributesManager.getSessionAttributes() as SessionAttributes;
}

export function CreateError(message: string, name: string): Error {
    const error = new Error(message);
    error.name = name;
    return error;
}

export function SupportsAPL(handlerInput: HandlerInput): boolean {
    const supportedInterfaces = handlerInput.requestEnvelope.context.System.device!.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface !== undefined;
}

export function ElicitSlotResponse(slotName: string, handlerInput: HandlerInput, speech: string, repromptSpeech: string): Response {
    const responseBuilder = handlerInput.responseBuilder;
    const currentIntent = (handlerInput.requestEnvelope.request as IntentRequest).intent;

    return responseBuilder
        .speak(speech)
        .reprompt(repromptSpeech)
        .addElicitSlotDirective(slotName, currentIntent)
        .getResponse();
}

export function IsIntentWithCompleteDialog(handlerInput: HandlerInput, intent: string): boolean {
    return IsIntentWithDialogState(handlerInput, intent, 'COMPLETED');
}

export function IsIntentWithDialogState(handlerInput: HandlerInput, intent: string, state: string): boolean {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
        && handlerInput.requestEnvelope.request.intent.name === intent
        && handlerInput.requestEnvelope.request.dialogState === state;
}

export function IsIntentWithIncompleteDialog(handlerInput: HandlerInput, intent: string): boolean {
    return handlerInput.requestEnvelope.request.type === RequestTypes.Intent
        && handlerInput.requestEnvelope.request.intent.name === intent
        && handlerInput.requestEnvelope.request.dialogState !== 'COMPLETED';
}


export function GetSlotValues(handlerInput: HandlerInput): SlotValues {
    if (handlerInput.requestEnvelope.request.type === RequestTypes.Intent) {
        const filledSlots = handlerInput.requestEnvelope.request.intent.slots;
        const slotValues: SlotValues = {};

        if (filledSlots) {
            Object.keys(filledSlots).forEach((item) => {
                const name = filledSlots[item].name;
                const value = filledSlots[item].value;
                const confirmationStatus = filledSlots[item].confirmationStatus;

                if (filledSlots[item] &&
                    filledSlots[item].resolutions &&
                    filledSlots[item].resolutions!.resolutionsPerAuthority &&
                    filledSlots[item].resolutions!.resolutionsPerAuthority![0] &&
                    filledSlots[item].resolutions!.resolutionsPerAuthority![0].status &&
                    filledSlots[item].resolutions!.resolutionsPerAuthority![0].status.code) {
                    switch (filledSlots[item].resolutions!.resolutionsPerAuthority![0].status.code) {
                        case 'ER_SUCCESS_MATCH':
                            const valueWrappers = filledSlots[item].resolutions!.resolutionsPerAuthority![0].values;

                            if (valueWrappers.length > 1) {
                                slotValues[name] = {
                                    name,
                                    value,
                                    isMatch: true,
                                    resolved: valueWrappers[0].value.name,
                                    id: valueWrappers[0].value.id,
                                    isAmbiguous: true,
                                    values: valueWrappers.map((valueWrapper) => valueWrapper.value),
                                    confirmationStatus,
                                } as MatchedSlotValue;
                                break;
                            }

                            slotValues[name] = {
                                name,
                                value,
                                isMatch: true,
                                resolved: valueWrappers[0].value.name,
                                id: valueWrappers[0].value.id,
                                isAmbiguous: false,
                                values: [],
                                confirmationStatus,
                            } as MatchedSlotValue;
                            break;
                        case 'ER_SUCCESS_NO_MATCH':
                            slotValues[name] = {
                                name,
                                value,
                                isMatch: false,
                                confirmationStatus,
                            } as UnmatchedSlotValue;
                            break;
                        default:
                            break;
                    }
                } else if (filledSlots[item] &&
                    !filledSlots[item].resolutions &&
                    filledSlots[item].value) {
                    slotValues[name] = {
                        name,
                        value,
                        isMatch: true,
                        resolved: value,
                        id: '',
                        isAmbiguous: false,
                        values: [],
                        confirmationStatus,
                    } as MatchedSlotValue;
                } else {
                    slotValues[name] = {
                        name,
                        value,
                        isMatch: false,
                        confirmationStatus,
                    } as UnmatchedSlotValue;
                }
            });
        }
        return slotValues;
    } else {
        return {};
    }
}
