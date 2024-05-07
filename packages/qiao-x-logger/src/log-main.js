// qiao-log
import Logger from 'qiao-log';

/**
 * logInit
 * @param {*} logPath
 * @param {*} logLevel
 * @returns
 */
export const logInit = (logPath, logLevel) => {
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

  return Logger(config);
};
