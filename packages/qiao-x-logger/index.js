'use strict';

var electron = require('electron');
var Logger$1 = require('qiao-log');

// electron

/**
 * logIPCInit
 */
const logIPCInit = () => {
  // check
  if (!global.logger) {
    console.log('qiao-x-logger / please init logger, use initLogger method');
    return;
  }

  // ipc log
  electron.ipcMain.on('ipc-log', (event, arg) => {
    // check
    if (!arg || !arg.msg) return;

    // log
    const logType = arg.type || 'debug';
    const msg = `renderer / ${arg.msg}`;
    if (logType == 'debug') global.logger.debug(msg);
    if (logType == 'info') global.logger.info(msg);
    if (logType == 'warn') global.logger.warn(msg);
    if (logType == 'error') global.logger.error(msg);
  });
};

// qiao-log

/**
 * initLogger
 * @param {*} logPath
 * @param {*} logLevel
 */
const initLogger = (logPath, logLevel) => {
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
  console.log('qiao-x-logger / config / ', config);

  // return
  global.logger = Logger$1(config);
};

// logs
const logs = ['debug', 'info', 'warn', 'error'];

/**
 * Logger
 * @param {*} namespace
 */
const Logger = (namespace) => {
  const obj = {};
  obj.namespace = namespace;
  logs.forEach(function (logType) {
    obj[logType] = function (methodName, ...msg) {
      log(logType, this.namespace, methodName, ...msg);
    };
  });

  return obj;
};

// log
function log(logType, namespace, methodName, ...msg) {
  // check
  if (!global.logger) {
    console.log('qiao-x-logger / please init logger, use initLogger method');
    return;
  }
  if (!namespace) {
    console.log('qiao-x-logger / need namespace');
    return;
  }
  if (!methodName) {
    console.log('qiao-x-logger / need methodName');
    return;
  }

  const finalMsg = `${namespace} / ${methodName} / ${msg}`;
  global.logger[logType](finalMsg);
}

exports.Logger = Logger;
exports.initLogger = initLogger;
exports.logIPCInit = logIPCInit;
