// electron
import { ipcRenderer } from 'electron';

/**
 * appGetVersionIPC
 * @returns version
 */
export const appGetVersionIPC = async () => {
  return await ipcRenderer.invoke('ipc-app-get-version');
};
