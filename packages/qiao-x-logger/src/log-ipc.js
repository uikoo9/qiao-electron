// electron
import { ipcMain } from 'electron';

/**
 * logIPCInit
 */
export const logIPCInit = () => {
  // check
  if (!global.logger) {
    console.log('qiao-x-logger / please init logger, use initLogger method');
    return;
  }

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
