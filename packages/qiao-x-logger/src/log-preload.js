// electron
import { ipcRenderer } from 'electron';

/**
 * logIPC
 * @param {*} msg
 * @param {*} type info,warn,error
 */
export const logIPC = (msg, type) => {
  ipcRenderer.send('ipc-log', { msg, type });
};
