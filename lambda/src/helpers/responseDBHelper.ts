import * as AWS from 'aws-sdk'; 

const dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10', convertEmptyValues: true}); 
const dynamoDB = new AWS.DynamoDB({apiVersion: '2012-08-10'}); 
const id = require('xid-js'); 
AWS.config.update({region: 'us-east-1'});

// funciton that will get item from DyanmoDB Table

export function getTableReponse(intent: string){
    return new Promise((resolve, reject) => {
        if(intent) { 
            const params = {
                TableName: 'IntentReponseTable', 
                Key: { 
                    IntentModel: intent
                }, 
                UpdateExpression: 'set Hits = Hits + :val', 
                ExpressionAttributeValues:{':val':1}, 
                ReturnValues: 'ALL_NEW'
            };
            dynamo.update(params, function(err, data){
                if(err){
                    console.log('GetItem threw an error:', err.message, err.name, err.stack); 
                    reject(err)
                } else { 
                    console.log('GetItem successed'); 
                    resolve(data.Attributes!.Reponse);
                }
            })
        }
    })
}