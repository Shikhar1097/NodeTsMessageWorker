import amqp, { Channel } from 'amqplib/callback_api';
import logger from '../../../logger.config';
import config from '../../../appConfigs';

class MQConnector {
  amqpChannel: Channel;

  connectToMQ(done: CallableFunction): void {
    logger.debug('Creating new connection with url', config.AMQP.AMQP_URL);
    amqp.connect(config.AMQP.AMQP_URL, (err: Error, newConnection: amqp.Connection) => {
      if (err) {
        logger.error('Error while obtaining connection', err);
        done(err);
      } else {
        logger.debug('AMQP successfully connected at ::', config.AMQP.AMQP_URL);
        newConnection.createChannel((error: Error, result: Channel) => {
          if (error) {
            logger.error(error.message);
            done(error);
          } else {
            logger.debug('Channel created');
            done(null, result);
          }
        });
      }
    });
  };

  // another function that would be used to get the value of the channel,
  // whenever there is a need of publishing or consuming some msg to rabbitmq.
  // This method is used to establish channel in order to publish or subscribe to messages
  getAMQPChannel(done: CallableFunction) {
    // Creating AMQP connection with the AMQP_URL
    this.connectToMQ((err: Error, result: Channel) => {
      if (err) {
        logger.error('Error in obtaining AMQP channel', err);
        done(err);
      } else {
        this.amqpChannel = result;
        done(null, this.amqpChannel);
      }
    });
  }
}

export default new MQConnector();
