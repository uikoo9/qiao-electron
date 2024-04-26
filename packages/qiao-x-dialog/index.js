'use strict';

var electron = require('electron');

// electron

/**
 * dialogOpenFile
 *  https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowopendialogbrowserwindow-options
 * @param {*} options
 * @returns
 */
const dialogOpenFile = async (options) => {
  return await openDialog(options, ['openFile']);
};

/**
 * dialogOpenFolder
 *  https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowopendialogbrowserwindow-options
 * @param {*} options
 * @returns
 */
const dialogOpenFolder = async (options) => {
  return await openDialog(options, ['openDirectory']);
};

/**
 * dialogOpenFileAndFolder
 *  https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowopendialogbrowserwindow-options
 * @param {*} options
 * @returns
 */
const dialogOpenFileAndFolder = async (options) => {
  return await openDialog(options, ['openFile', 'openDirectory']);
};

// openDialog
async function openDialog(options, defaultProps) {
  // opt
  let opt = options || {};

  // properties
  opt.properties = opt.properties || defaultProps;

  // win
  const win = opt.win;

  // filter
  if (opt.files) {
    opt.filters = [
      {
        name: 'files',
        extensions: opt.files,
      },
    ];
    delete opt.files;
  }

  // return
  return win ? await electron.dialog.showOpenDialog(win, opt) : await electron.dialog.showOpenDialog(opt);
}

/**
 * dialog constant
 */
const IPC_DIALOG_OPEN_FILE = 'ipc-dialog-open-file';
const IPC_DIALOG_OPEN_FOLDER = 'ipc-dialog-open-folder';
const IPC_DIALOG_OPEN_FILE_FOLDER = 'ipc-dialog-open-file-folder';

// electron

/**
 * dialogIPCInit
 */
const dialogIPCInit = () => {
  // ipc dialog open file
  electron.ipcMain.handle(IPC_DIALOG_OPEN_FILE, async (event, options) => {
    return await dialogOpenFile(options);
  });

  // ipc dialog open folder
  electron.ipcMain.handle(IPC_DIALOG_OPEN_FOLDER, async (event, options) => {
    return await dialogOpenFolder(options);
  });

  // ipc dialog open file and folder
  electron.ipcMain.handle(IPC_DIALOG_OPEN_FILE_FOLDER, async (event, options) => {
    return await dialogOpenFileAndFolder(options);
  });
};

exports.dialogIPCInit = dialogIPCInit;
exports.dialogOpenFile = dialogOpenFile;
exports.dialogOpenFileAndFolder = dialogOpenFileAndFolder;
exports.dialogOpenFolder = dialogOpenFolder;
