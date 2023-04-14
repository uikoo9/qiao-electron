// electron
import { ipcMain } from 'electron';

// ls
import { ls } from './_ls.js';

// const
import { IPC_LS_ALL, IPC_LS_GET, IPC_LS_SET, IPC_LS_DEL } from './ls-constant.js';

/**
 * lsIPCInit
 */
export const lsIPCInit = () => {
  const _ls = ls();

  // ipc ls all
  ipcMain.handle(IPC_LS_ALL, async () => {
    return await _ls.all();
  });

  // ipc ls get
  ipcMain.handle(IPC_LS_GET, async (event, key) => {
    return await _ls.config(key);
  });

  // ipc ls set
  ipcMain.handle(IPC_LS_SET, async (event, args) => {
    // check
    if (!args || !args.key || !args.value) return;

    // set
    await _ls.config(args.key, args.value);

    // return
    return true;
  });

  // ipc ls del
  ipcMain.handle(IPC_LS_DEL, async (event, key) => {
    // del
    await _ls.config(key, null);

    //return
    return true;
  });
};
