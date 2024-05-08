'use strict';

var qiaoXApp = require('qiao-x-app');
var electron = require('electron');
var qiaoXDialog = require('qiao-x-dialog');
var qiaoFile = require('qiao-file');
var path = require('path');
var Logger = require('qiao-log');
var q = require('qiao-config');
var qiaoXShortcut = require('qiao-x-shortcut');

/**
 * darkmode constant
 */
const IPC_DARKMODE_CHANGE = 'ipc-darkmode-change';
const IPC_DARKMODE_GET = 'ipc-darkmode-get';

// electron

/**
 * darkModeIPCInit
 */
const darkModeIPCInit = () => {
  // native theme updated
  electron.nativeTheme.on('updated', () => {
    const wins = electron.BrowserWindow.getAllWindows();
    for (let win of wins) {
      win.webContents.send(IPC_DARKMODE_CHANGE, electron.nativeTheme.shouldUseDarkColors);
    }
  });

  // ipc darkmode get
  electron.ipcMain.handle(IPC_DARKMODE_GET, () => {
    return electron.nativeTheme.shouldUseDarkColors;
  });
};

/**
 * fs constant
 */
const IPC_FS_RM = 'ipc-fs-rm';
const IPC_FS_MKDIR = 'ipc-fs-mkdir';
const IPC_FS_RENAME = 'ipc-fs-rename';
const IPC_FS_GET_TREE = 'ipc-fs-get-tree';
const IPC_FS_READ_FILE = 'ipc-fs-read-file';
const IPC_FS_WRITE_FILE = 'ipc-fs-write-file';

// electron

/**
 * fsIPCInit
 */
const fsIPCInit = () => {
  // ipc fs rm
  electron.ipcMain.handle(IPC_FS_RM, async (event, rmPath) => {
    if (!rmPath) return;

    return await qiaoFile.rm(rmPath);
  });

  // ipc fs mkdir
  electron.ipcMain.handle(IPC_FS_MKDIR, async (event, dir) => {
    if (!dir) return;

    return await qiaoFile.mkdir(dir);
  });

  // ipc fs rename
  electron.ipcMain.handle(IPC_FS_RENAME, async (event, oldPath, newPath) => {
    if (!oldPath || !newPath) return;

    return await qiaoFile.mv(oldPath, newPath);
  });

  // ipc fs get tree
  electron.ipcMain.handle(IPC_FS_GET_TREE, async (event, dir, ignores) => {
    if (!dir) return;

    return await qiaoFile.lstree(dir, ignores);
  });

  // ipc fs read file
  electron.ipcMain.handle(IPC_FS_READ_FILE, async (event, filePath) => {
    if (!filePath) return;

    return await qiaoFile.readFile(filePath);
  });

  // ipc fs write file
  electron.ipcMain.handle(IPC_FS_WRITE_FILE, async (event, filePath, fileData) => {
    if (!filePath) return;

    return await qiaoFile.writeFile(filePath, fileData);
  });
};

// path

/**
 * logInit
 * @returns
 */
const logInit = () => {
  const logPath = path.resolve(electron.app.getPath('logs'), './electron.log');

  // config
  const config = {
    appenders: {
      stdout: {
        type: 'stdout',
      },
      datefile: {
        type: 'dateFile',
        pattern: 'yyyy-MM-dd-hh',
        filename: logPath,
        keepFileExt: true,
      },
    },
    categories: {
      default: {
        level: 'debug',
        appenders: ['stdout', 'datefile'],
      },
    },
  };

  return Logger(config);
};

/**
 * log constant
 */
const IPC_LOG = 'ipc-log';

// electron

/**
 * logIPCInit
 */
const logIPCInit = () => {
  // Logger
  const Logger = logInit();

  // ipc log
  electron.ipcMain.on(IPC_LOG, (event, arg) => {
    // check
    if (!arg || !arg.msg) return;

    // log
    let type = arg.type || 'info';
    if (type == 'info') Logger.info(arg.msg);
    if (type == 'warn') Logger.warn(arg.msg);
    if (type == 'error') Logger.error(arg.msg);
  });
};

// path

/**
 * ls
 * @returns
 */
const ls = () => {
  const userDataPath = electron.app.getPath('userData');
  const configPath = path.resolve(userDataPath, './electron.config');
  const config = q(configPath);

  return config;
};

/**
 * ls constant
 */
const IPC_LS_ALL = 'ipc-ls-all';
const IPC_LS_GET = 'ipc-ls-get';
const IPC_LS_SET = 'ipc-ls-set';
const IPC_LS_DEL = 'ipc-ls-del';

// electron

/**
 * lsIPCInit
 */
const lsIPCInit = () => {
  const _ls = ls();

  // ipc ls all
  electron.ipcMain.handle(IPC_LS_ALL, async () => {
    return await _ls.all();
  });

  // ipc ls get
  electron.ipcMain.handle(IPC_LS_GET, async (event, key) => {
    return await _ls.config(key);
  });

  // ipc ls set
  electron.ipcMain.handle(IPC_LS_SET, async (event, args) => {
    // check
    if (!args || !args.key || !args.value) return;

    // set
    await _ls.config(args.key, args.value);

    // return
    return true;
  });

  // ipc ls del
  electron.ipcMain.handle(IPC_LS_DEL, async (event, key) => {
    // del
    await _ls.config(key, null);

    //return
    return true;
  });
};

/**
 * shell constant
 */
const IPC_SHELL_OPEN_URL = 'ipc-shell-open-url';
const IPC_SHELL_SHOW_PATH = 'ipc-shell-show-path';

// electron

/**
 * shellOpenURL
 */
const shellOpenURL = (url) => {
  electron.shell.openExternal(url, { activate: true });
};

/**
 *
 * @param {*} path
 */
const shellShowPath = (path) => {
  try {
    const stat = qiaoFile.fs.statSync(path);
    if (stat.isDirectory()) {
      electron.shell.openPath(path);
    } else {
      electron.shell.showItemInFolder(path);
    }
  } catch (e) {
    console.log(e);
  }
};

// electron

/**
 * shellIPCInit
 */
const shellIPCInit = () => {
  // ipc shell open url
  electron.ipcMain.on(IPC_SHELL_OPEN_URL, (event, url) => {
    if (!url) return;

    shellOpenURL(url);
  });

  // ipc shell show path
  electron.ipcMain.on(IPC_SHELL_SHOW_PATH, (event, path) => {
    if (!path) return;

    shellShowPath(path);
  });
};

/**
 * window constant
 */
const IPC_WINDOW_RESIZE_TO = 'ipc-window-resize-to';

// electron

/**
 * windowIPCInit
 */
const windowIPCInit = () => {
  // ipc window resize to
  electron.ipcMain.on(IPC_WINDOW_RESIZE_TO, (event, width, height) => {
    if (!event || !event.sender || !width || !height) return;

    const win = electron.BrowserWindow.fromWebContents(event.sender);
    win.setSize(width, height);
  });
};

// app

/**
 * ipcInit
 * @param {*} version
 */
const ipcInit = (version) => {
  // app
  if (version) qiaoXApp.appIPCInit(version);

  // others
  darkModeIPCInit();
  qiaoXDialog.dialogIPCInit();
  fsIPCInit();
  logIPCInit();
  lsIPCInit();
  shellIPCInit();
  windowIPCInit();
};

// electron

/**
 * darkModeChangeIPC
 */
const darkModeChangeIPC = (callback) => {
  electron.ipcRenderer.on(IPC_DARKMODE_CHANGE, (e, msg) => {
    if (callback) callback(msg);
  });
};

/**
 * darkModeGetIPC
 * @returns
 */
const darkModeGetIPC = async () => {
  return await electron.ipcRenderer.invoke(IPC_DARKMODE_GET);
};

// electron

/**
 * fsRmIPC
 */
const fsRmIPC = async (rmPath) => {
  return await electron.ipcRenderer.invoke(IPC_FS_RM, rmPath);
};

/**
 * fsMkdirIPC
 */
const fsMkdirIPC = async (dir) => {
  return await electron.ipcRenderer.invoke(IPC_FS_MKDIR, dir);
};

/**
 * fsRenameIPC
 */
const fsRenameIPC = async (oldPath, newPath) => {
  return await electron.ipcRenderer.invoke(IPC_FS_RENAME, oldPath, newPath);
};

/**
 * fsGetTreeIPC
 */
const fsGetTreeIPC = async (dir, ignores) => {
  return await electron.ipcRenderer.invoke(IPC_FS_GET_TREE, dir, ignores);
};

/**
 * fsReadFileIPC
 */
const fsReadFileIPC = async (filePath) => {
  return await electron.ipcRenderer.invoke(IPC_FS_READ_FILE, filePath);
};

/**
 * fsWriteFileIPC
 */
const fsWriteFileIPC = async (filePath, fileData) => {
  return await electron.ipcRenderer.invoke(IPC_FS_WRITE_FILE, filePath, fileData);
};

// electron

/**
 * logIPC
 * @param {*} msg
 * @param {*} type info,warn,error
 */
const logIPC = (msg, type) => {
  electron.ipcRenderer.send(IPC_LOG, { msg, type });
};

// electron

/**
 * lsAllIPC
 */
const lsAllIPC = async () => {
  return await electron.ipcRenderer.invoke(IPC_LS_ALL);
};

/**
 * lsGetIPC
 */
const lsGetIPC = async (key) => {
  return await electron.ipcRenderer.invoke(IPC_LS_GET, key);
};

/**
 * lsSetIPC
 */
const lsSetIPC = async (key, value) => {
  return await electron.ipcRenderer.invoke(IPC_LS_SET, { key, value });
};

/**
 * lsDelIPC
 */
const lsDelIPC = async (key) => {
  return await electron.ipcRenderer.invoke(IPC_LS_DEL, key);
};

// electron

/**
 * shellOpenUrlIPC
 * @param {*} url
 */
const shellOpenUrlIPC = (url) => {
  electron.ipcRenderer.send(IPC_SHELL_OPEN_URL, url);
};

/**
 * shellShowPathIPC
 * @param {*} path
 */
const shellShowPathIPC = (path) => {
  electron.ipcRenderer.send(IPC_SHELL_SHOW_PATH, path);
};

// electron

/**
 * windowResizeIPC
 * @param {*} width
 * @param {*} height
 */
const windowResizeIPC = (width, height) => {
  electron.ipcRenderer.send(IPC_WINDOW_RESIZE_TO, width, height);
};

// darkmode

/**
 * getPreloads
 * @param {*} customPreloads
 * @returns
 */
const getPreloads = (customPreloads) => {
  const defaultPreloads = {
    darkModeChangeIPC,
    darkModeGetIPC,
    fsRmIPC,
    fsMkdirIPC,
    fsRenameIPC,
    fsGetTreeIPC,
    fsReadFileIPC,
    fsWriteFileIPC,
    logIPC,
    lsAllIPC,
    lsGetIPC,
    lsSetIPC,
    lsDelIPC,
    shellOpenUrlIPC,
    shellShowPathIPC,
    windowResizeIPC,
  };

  return { ...defaultPreloads, ...customPreloads };
};

Object.defineProperty(exports, 'dialogOpenFile', {
  enumerable: true,
  get: function () {
    return qiaoXDialog.dialogOpenFile;
  },
});
Object.defineProperty(exports, 'dialogOpenFileAndFolder', {
  enumerable: true,
  get: function () {
    return qiaoXDialog.dialogOpenFileAndFolder;
  },
});
Object.defineProperty(exports, 'dialogOpenFolder', {
  enumerable: true,
  get: function () {
    return qiaoXDialog.dialogOpenFolder;
  },
});
Object.defineProperty(exports, 'shortcutReg', {
  enumerable: true,
  get: function () {
    return qiaoXShortcut.shortcutReg;
  },
});
Object.defineProperty(exports, 'shortcutUnReg', {
  enumerable: true,
  get: function () {
    return qiaoXShortcut.shortcutUnReg;
  },
});
exports.getPreloads = getPreloads;
exports.ipcInit = ipcInit;
exports.logInit = logInit;
exports.ls = ls;
exports.shellOpenURL = shellOpenURL;
exports.shellShowPath = shellShowPath;
