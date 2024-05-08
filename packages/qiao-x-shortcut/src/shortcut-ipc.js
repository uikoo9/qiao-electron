// electron
import { ipcMain } from 'electron';

// shortcut
import { shortcutReg } from './shortcut-main.js';

// functions
// const functions = {
//   shortcutCallbackName: async () => 'shortcutCallbackName from main',
// };

/**
 * shortcutIPCInit
 * @param {*} functions
 */
export const shortcutIPCInit = (functions) => {
  // check
  if (!functions || !functions.length) return;

  // ipc
  ipcMain.handle('ipc-shortcut-global', async (event, shortcutKey, shortcutCallbackName) => {
    if (!(shortcutCallbackName in functions)) return;

    shortcutReg(shortcutKey, functions[shortcutCallbackName]);
    return true;
  });
};
