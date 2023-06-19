// path
import path from 'path';

// electron
import { app } from 'electron';

// qiao-log
import Logger from 'qiao-log';

/**
 * logInit
 * @returns
 */
export const logInit = () => {
  const logPath = path.resolve(app.getPath('logs'), './electron.log');

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
        level: 'debug',
        appenders: ['stdout', 'datefile'],
      },
    },
  };

  return Logger(config);
};
