import amqp from 'amqplib/callback_api';
import logger from '../../../logger.config';
import mqconnector from './MQConnector';

class MQPublisher {
  publishMessageToTopicQueue(eventMessage: string, exchangeName: string,
    topicPattern: string, channel: amqp.Channel, done: CallableFunction) {
    const bufferMessage = Buffer.from(JSON.stringify(eventMessage));

    channel.assertExchange(exchangeName, 'topic', { durable: false });
    // publishing the message to the provided exchange
    logger.debug(`Publishing to topic::: ${topicPattern}`);
    channel.publish(exchangeName, topicPattern, bufferMessage);
    done(null, eventMessage);
  }

  publishAMQPTopicExchange(eventsMessage: string, exchange: string,
    topicPattern: string, done: CallableFunction) {
    // Establishing AMQP connection and channel first in order to publish message
    mqconnector.getAMQPChannel((err: Error, channel: amqp.Channel) => {
      if (err) {
        logger.error('Error while creating channel', err);
      } else {
        // The channel fetched from getAMQPChannel method is passed on to publish message
        this.publishMessageToTopicQueue(eventsMessage, exchange, topicPattern, channel, done);
      }
    });
  }
}

export default new MQPublisher();
