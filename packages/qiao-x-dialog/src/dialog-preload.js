// electron
import { ipcRenderer } from 'electron';

/**
 * dialogOpenFileIPC
 * @param {*} options
 */
export const dialogOpenFileIPC = async (options) => {
  return await ipcRenderer.invoke('ipc-dialog-open-file', options);
};

/**
 * dialogOpenFolderIPC
 * @param {*} options
 */
export const dialogOpenFolderIPC = async (options) => {
  return await ipcRenderer.invoke('ipc-dialog-open-folder', options);
};

/**
 * dialogOpenFileAndFolderIPC
 * @param {*} options
 */
export const dialogOpenFileAndFolderIPC = async (options) => {
  return await ipcRenderer.invoke('ipc-dialog-open-file-folder', options);
};
