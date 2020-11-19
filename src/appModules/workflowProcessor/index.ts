import logger from '../../logger.config';
import config from '../../appConfigs';
import mqregister from '../messageBroker/amqp/MQRegister';
import eventProcessor from './workflowController/eventProcessor';

class RegisterListeners {
  registerWorker() {
    mqregister.registerAMQPTopicWorker(
      eventProcessor,
      config.AMQP.AMQP_EXCHANGE,
      config.AMQP.AMQP_QUEUE,
      'Test-Pattern',
      (err: Error) => {
        if (err != null) {
          logger.error('Error occurred in registering to mq');
        }
      }
    );
  }
}

export default new RegisterListeners();
