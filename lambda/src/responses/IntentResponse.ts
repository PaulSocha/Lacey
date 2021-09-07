import { HandlerInput } from "ask-sdk-core";
import { IntentRequest, Response } from "ask-sdk-model";
import * as AWS from 'aws-sdk';
import * as helper from '../helpers/responseDBHelper'; 
import { GetSlotValues } from "../helpers/util";

const dynamo = new AWS.DynamoDB({ apiVersion: '2012-08-10' }); 

export async function GetIntentReponse(handlerInput: HandlerInput, string: string = ''): Promise<Response> {
    console.log(`getIntentHandler: ${JSON.stringify(handlerInput)}`); 
    const currentIntent = handlerInput.requestEnvelope.request as IntentRequest;
    const myIntent = GetSlotValues(handlerInput); 
    const myIntentValue = myIntent['myIntent']!.resolved;
    
    const responseTable = { 
        Key: {
            Intents: { 
                S: myIntentValue
            },
        },
        TableName: 'IntentResponseTable',
    }; 

    const getIntent = await dynamo.getItem(responseTable).promise(); 

    try { 
        console.log('Intent request'); 
        const intentResponse = await helper.getTableReponse(myIntentValue!);
        return handlerInput.responseBuilder
            .speak(`${intentResponse!}`)
            .reprompt('What else can I help with today')
            .getResponse(); 

    } catch(error) {
        console.log(error); 
    }
    return handlerInput.responseBuilder
        .speak('Sorry I dont have that answer')
        .reprompt('What else can I assit with')
        .getResponse();
}