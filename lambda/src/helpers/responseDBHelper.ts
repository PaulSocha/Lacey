import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const xid = require('xid-js');
AWS.config.update({region: 'us-east-1'});

// tslint:disable-next-line: variable-name
export function addQA(responseQ1: string, responseQ2: string, responseQ3: string, responseQ4: string, responseQ5: string,  userId: string)  {
    // tslint:disable-next-line: prefer-const
    return new Promise((resolve, reject) => {
        const dateTime = new Date();
        // tslint:disable-next-line: one-variable-per-declaration
        const params = {
            TableName: 'SurveyTable',
            Item: {
                id : {
                    S : xid.next(),
                },   
                userId: {
                    S : userId,
                },
                date : {                   
                        S: dateTime.toString(),
                    },
                responseQ1:{
                    S: responseQ1.toString()
                },
                responseQ2:{
                    S: responseQ2.toString()
                },
                responseQ3:{
                    S: responseQ3.toString()
                },
                responseQ4:{
                    S: responseQ4.toString()
                },
                responseQ5:{
                    S: responseQ5.toString()
                },
            },
        };

        dynamoDB.putItem(params, (err, data) => {
            if (err) {
                console.log('Unable to insert =>', JSON.stringify(err), err.stack, err.code);
                return reject('Unable to insert');
            }
            console.log('Saved Data, ', JSON.stringify(data));
            resolve(data);
        });
    });
}