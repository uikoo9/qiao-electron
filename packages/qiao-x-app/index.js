'use strict';

var electron = require('electron');

/**
 * app constant
 */
const IPC_APP_GET_VERSION = 'ipc-app-get-version';

// electron

/**
 * appIPCInit
 */
const appIPCInit = (version) => {
  // ipc get app version
  electron.ipcMain.handle(IPC_APP_GET_VERSION, () => {
    return version;
  });
};

exports.appIPCInit = appIPCInit;
