// electron
import { ipcRenderer } from 'electron';

/**
 * shortcutGlobalIPC
 * @returns res
 */
export const shortcutGlobalIPC = async (shortcutKey, shortcutCallbackName) => {
  return await ipcRenderer.invoke('ipc-shortcut-global', shortcutKey, shortcutCallbackName);
};
