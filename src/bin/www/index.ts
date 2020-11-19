import logger from '../../logger.config';

class AppStarter {
  starter() {
    logger.debug('Initiating Data Loader...');
  }
}

export default new AppStarter();
