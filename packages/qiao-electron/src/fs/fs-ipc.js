// electron
import { ipcMain } from 'electron';

// q
import { mv, rm, mkdir, lstree, readFile, writeFile } from 'qiao-file';

// const
import {
  IPC_FS_RM,
  IPC_FS_MKDIR,
  IPC_FS_RENAME,
  IPC_FS_GET_TREE,
  IPC_FS_READ_FILE,
  IPC_FS_WRITE_FILE,
} from './fs-constant.js';

/**
 * fsIPCInit
 */
export const fsIPCInit = () => {
  // ipc fs rm
  ipcMain.handle(IPC_FS_RM, async (event, rmPath) => {
    if (!rmPath) return;

    return await rm(rmPath);
  });

  // ipc fs mkdir
  ipcMain.handle(IPC_FS_MKDIR, async (event, dir) => {
    if (!dir) return;

    return await mkdir(dir);
  });

  // ipc fs rename
  ipcMain.handle(IPC_FS_RENAME, async (event, oldPath, newPath) => {
    if (!oldPath || !newPath) return;

    return await mv(oldPath, newPath);
  });

  // ipc fs get tree
  ipcMain.handle(IPC_FS_GET_TREE, async (event, dir, ignores) => {
    if (!dir) return;

    return await lstree(dir, ignores);
  });

  // ipc fs read file
  ipcMain.handle(IPC_FS_READ_FILE, async (event, filePath) => {
    if (!filePath) return;

    return await readFile(filePath);
  });

  // ipc fs write file
  ipcMain.handle(IPC_FS_WRITE_FILE, async (event, filePath, fileData) => {
    if (!filePath) return;

    return await writeFile(filePath, fileData);
  });
};
