import logger from '../../logger.config';
import mqworkerreg from '../../appModules/workflowProcessor';

class AppStarter {
  starter() {
    logger.debug('Initiating Data Loader...');
    mqworkerreg.registerWorker();
  }
}

export default new AppStarter();
