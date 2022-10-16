import { SkillBuilders } from 'ask-sdk';
import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';
import { config as AWSConfig } from 'aws-sdk';
import {
    InProgressSurveyHandler,
    LaunchRequestHandler,
    CompletedSurveyHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    HelpIntentHandler,
    SessionEndedRequestHandler,

} from './handlers';
import { ConsoleLogger, Logger } from './services';
AWSConfig.update({
  region: 'us-east-1',
});

const logger: Logger = new ConsoleLogger();

export const handler: LambdaHandler = SkillBuilders.custom()
  .addRequestHandlers(
      new LaunchRequestHandler(),
      new CompletedSurveyHandler(),
      new CancelAndStopIntentHandler(),
      new FallbackIntentHandler(),
      new HelpIntentHandler(),
      new InProgressSurveyHandler(),
      new SessionEndedRequestHandler(logger),
  )
  .lambda();
