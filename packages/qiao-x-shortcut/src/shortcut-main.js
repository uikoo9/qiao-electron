// electron
import { app, globalShortcut } from 'electron';

/**
 * initShortcut
 */
export const initShortcut = () => {
  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
  });
};

/**
 * shortcutReg
 * @param {*} shortcutKey
 * @param {*} shortcutCallback
 */
export const shortcutReg = (shortcutKey, shortcutCallback) => {
  if (!shortcutKey || !shortcutCallback) return;

  return globalShortcut.register(shortcutKey, shortcutCallback);
};

/**
 * shortcutUnReg
 * @param {*} shortcutKey
 */
export const shortcutUnReg = (shortcutKey) => {
  if (!shortcutKey) return;

  return globalShortcut.unregister(shortcutKey);
};
