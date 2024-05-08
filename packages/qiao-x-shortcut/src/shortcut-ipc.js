// electron
import { ipcMain } from 'electron';

// shortcut
import { shortcutReg } from './shortcut-main.js';

// logger
import { Logger as ConsoleLogger } from 'qiao.log.js';
import { Logger as LocalLogger } from 'qiao-x-logger';
const consoleLogger = ConsoleLogger('qiao-x-shortcut');
const localLogger = LocalLogger('qiao-x-shortcut');

/**
 * shortcutIPCInit
 * @param {*} functions
 */
export const shortcutIPCInit = (functions, useLocalLogger) => {
  const methodName = 'shortcutIPCInit';
  const logger = useLocalLogger ? localLogger : consoleLogger;

  // check
  logger.info(methodName, 'functions', functions);
  if (!functions) return;

  // ipc
  ipcMain.handle('ipc-shortcut-global', async (event, shortcutKey, shortcutCallbackName) => {
    logger.info(methodName, 'shortcutKey', shortcutKey);
    logger.info(methodName, 'shortcutCallbackName', shortcutCallbackName);
    if (!(shortcutCallbackName in functions)) {
      logger.info(methodName, 'shortcutCallbackName not in functions');
      return;
    }

    const shortcutRegRes = shortcutReg(shortcutKey, functions[shortcutCallbackName]);
    logger.info(methodName, 'shortcutRegRes', shortcutRegRes);
    return shortcutRegRes;
  });
};
