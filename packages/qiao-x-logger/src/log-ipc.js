// electron
import { ipcMain } from 'electron';

// log
import { logInit } from './log-main.js';

/**
 * logIPCInit
 * @param {*} logPath
 * @param {*} logLevel
 */
export const logIPCInit = (logPath, logLevel) => {
  // Logger
  const Logger = logInit(logPath, logLevel);

  // ipc log
  ipcMain.on('ipc-log', (event, arg) => {
    // check
    if (!arg || !arg.msg) return;

    // log
    let type = arg.type || 'debug';
    if (type == 'debug') Logger.debug(arg.msg);
    if (type == 'info') Logger.info(arg.msg);
    if (type == 'warn') Logger.warn(arg.msg);
    if (type == 'error') Logger.error(arg.msg);
  });
};
