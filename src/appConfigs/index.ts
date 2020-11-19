import localConfig from './env/local';

const appConfig: any = {
  local: localConfig
};

const effectiveENV = process.env.NODE_ENV || 'local';

const effectiveConfig = appConfig[effectiveENV];

process.stdout.write(`\nconfig settings for environment: ${process.env.NODE_ENV} ${JSON.stringify(effectiveConfig)}\n`);

export default effectiveConfig;
