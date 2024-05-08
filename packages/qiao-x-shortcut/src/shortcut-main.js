// electron
import { app, globalShortcut } from 'electron';

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

/**
 * shortcutInit
 */
export const shortcutInit = () => {
  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
  });
};
