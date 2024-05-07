'use strict';

var electron = require('electron');
var Logger = require('qiao-log');

// qiao-log

/**
 * logInit
 * @param {*} logPath
 * @param {*} logLevel
 * @returns
 */
const logInit = (logPath, logLevel) => {
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
        level: logLevel || 'debug',
        appenders: ['stdout', 'datefile'],
      },
    },
  };

  return Logger(config);
};

// electron

/**
 * logIPCInit
 * @param {*} logPath
 * @param {*} logLevel
 */
const logIPCInit = (logPath, logLevel) => {
  // Logger
  const Logger = logInit(logPath, logLevel);

  // ipc log
  electron.ipcMain.on('ipc-log', (event, arg) => {
    // check
    if (!arg || !arg.msg) return;

    // log
    let type = arg.type || 'debug';
    if (type == 'debug') Logger.debug(arg.msg);
    if (type == 'info') Logger.info(arg.msg);
    if (type == 'warn') Logger.warn(arg.msg);
    if (type == 'error') Logger.error(arg.msg);
  });
};

exports.logIPCInit = logIPCInit;
