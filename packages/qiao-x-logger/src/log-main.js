// qiao-log
import Logger from 'qiao-log';

/**
 * initLogger
 * @param {*} logPath
 * @param {*} logLevel
 */
export const initLogger = (logPath, logLevel) => {
  // config
  const config = {
    appenders: {
      stdout: {
        type: 'stdout',
      },
      datefile: {
        type: 'dateFile',
        pattern: 'yyyy-MM-dd-hh',
        filename: logPath,
        keepFileExt: true,
      },
    },
    categories: {
      default: {
        level: logLevel || 'debug',
        appenders: ['stdout', 'datefile'],
      },
    },
  };

  // return
  global.logger = Logger(config);
};
