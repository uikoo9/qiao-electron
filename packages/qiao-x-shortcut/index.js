'use strict';

var electron = require('electron');
var qiao_log_js = require('qiao.log.js');
var qiaoXLogger = require('qiao-x-logger');

// electron

/**
 * initShortcut
 */
const initShortcut = () => {
  electron.app.on('will-quit', () => {
    electron.globalShortcut.unregisterAll();
  });
};

/**
 * shortcutReg
 * @param {*} shortcutKey
 * @param {*} shortcutCallback
 */
const shortcutReg = (shortcutKey, shortcutCallback) => {
  if (!shortcutKey || !shortcutCallback) return;

  return electron.globalShortcut.register(shortcutKey, shortcutCallback);
};

/**
 * shortcutUnReg
 * @param {*} shortcutKey
 */
const shortcutUnReg = (shortcutKey) => {
  if (!shortcutKey) return;

  return electron.globalShortcut.unregister(shortcutKey);
};

// electron
const consoleLogger = qiao_log_js.Logger('qiao-x-shortcut');
const localLogger = qiaoXLogger.Logger('qiao-x-shortcut');

/**
 * shortcutIPCInit
 * @param {*} functions
 */
const shortcutIPCInit = (functions, useLocalLogger) => {
  const methodName = 'shortcutIPCInit';
  const logger = useLocalLogger ? localLogger : consoleLogger;

  // check
  logger.info(methodName, 'functions', functions);
  if (!functions) return;

  // ipc
  electron.ipcMain.handle('ipc-shortcut-global', async (event, shortcutKey, shortcutCallbackName) => {
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

exports.initShortcut = initShortcut;
exports.shortcutIPCInit = shortcutIPCInit;
exports.shortcutReg = shortcutReg;
exports.shortcutUnReg = shortcutUnReg;
