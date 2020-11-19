import amqp from 'amqplib/callback_api';
import logger from '../../../logger.config';
import mqconnector from './MQConnector';

class MQRegister {
  registerWorkerToTopicQueue(
    eventProcessor: any,
    exchange: string,
    queueNamePrefix: string,
    topicPattern: string,
    channel: amqp.Channel,
    done: CallableFunction
  ) {
    channel.assertExchange(exchange, 'topic', { durable: false });
    channel.assertQueue(
      `TQ-${queueNamePrefix}`,
      { durable: true },
      (ampQErr: Error, result: any) => {
        if (ampQErr) {
          logger.error('Error in wiring with queue ERROR::', ampQErr);
          done(ampQErr);
        } else {
          channel.bindQueue(result.queue, exchange, topicPattern);
          channel.consume(result.queue, (msg: any) => {
            try {
              const parsedMessageObj = msg.content.toString('utf8');
              // calling elasticindexloader
              eventProcessor.processMqEvents(parsedMessageObj);
            } catch (error) {
              logger.error(error.message);
            }
            channel.ack(msg);
            done(null);
          });
        }
      }
    );
  }

  registerAMQPTopicWorker(
    eventProcessor: any,
    exchange: string,
    queueNamePrefix: string,
    topicPattern: string,
    done: CallableFunction
  ) {
    // Establishing AMQP connection and channel first in order to subscribe to message
    mqconnector.getAMQPChannel(
      (err: Error, channel: amqp.Channel) => {
        if (err) {
          logger.error('Error while creating the channel', err);
        } else {
          logger.debug('Channel Received');
          // The channel fetched from getAMQPChannel method is passed on to subcribe message
          this.registerWorkerToTopicQueue(
            eventProcessor,
            exchange,
            queueNamePrefix,
            topicPattern,
            channel,
            done
          );
        }
      }
    );
  }
}

export default new MQRegister();
