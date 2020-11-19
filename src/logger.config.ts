const log4js = require('log4js');

// specifying the configuration of the log4js, the name and the type.
log4js.configure({
  appenders: { EagleEyeETLConnector: { type: 'console' } },
  categories: { default: { appenders: ['BoilerPlateCode'], level: 'debug' } }
});
const logger = log4js.getLogger();
export default logger;
