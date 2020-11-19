import logger from '../../../logger.config';

class EventProcessor {
  processMqEvents(mqObj: string) {
    logger.debug(mqObj);
  }
}

export default new EventProcessor();
