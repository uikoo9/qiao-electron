'use strict';

var electron = require('electron');

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

// functions
// const functions = {
//   shortcutCallbackName: async () => 'shortcutCallbackName from main',
// };

/**
 * shortcutIPCInit
 * @param {*} functions
 */
const shortcutIPCInit = (functions) => {
  // check
  if (!functions || !functions.length) return;

  // ipc
  electron.ipcMain.handle('ipc-shortcut-global', async (event, shortcutKey, shortcutCallbackName) => {
    if (!(shortcutCallbackName in functions)) return;

    shortcutReg(shortcutKey, functions[shortcutCallbackName]);
    return true;
  });
};

exports.initShortcut = initShortcut;
exports.shortcutIPCInit = shortcutIPCInit;
exports.shortcutReg = shortcutReg;
exports.shortcutUnReg = shortcutUnReg;
