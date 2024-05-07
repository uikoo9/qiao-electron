// electron
import { ipcMain } from 'electron';

// qiao-log
import Logger from 'qiao-log';

/**
 * logIPCInit
 * @param {*} logPath
 * @param {*} logLevel
 */
export const logIPCInit = (logPath, logLevel) => {
  // logger
  logInit(logPath, logLevel);

  // ipc log
  ipcMain.on('ipc-log', (event, arg) => {
    // check
    if (!arg || !arg.msg) return;

    // log
    const logType = arg.type || 'debug';
    const msg = `renderer / ${arg.msg}`;
    if (logType == 'debug') global.logger.debug(msg);
    if (logType == 'info') global.logger.info(msg);
    if (logType == 'warn') global.logger.warn(msg);
    if (logType == 'error') global.logger.error(msg);
  });
};

// logger init
function logInit(logPath, logLevel) {
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
}
