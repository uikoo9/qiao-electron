## qiao-x-logger

[![npm version](https://img.shields.io/npm/v/qiao-x-logger.svg?style=flat-square)](https://www.npmjs.org/package/qiao-x-logger)
[![npm downloads](https://img.shields.io/npm/dm/qiao-x-logger.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-x-logger)

Electron 中日志相关的操作封装，详见：[Electron-开发实践：本地日志](https://blog.vincentqiao.com/electron-logger)

## install

安装

```shell
npm i qiao-x-logger
```

## use

使用

```javascript
// cjs
const { Logger } = require('qiao-x-logger');

// mjs
import { Logger } from 'qiao-x-logger';

// logger
const logger = Logger('qiao-x-logger');
```

## main

主进程代码

### initLogger

初始化logger，只有初始化logger后其他方法才可以使用

- logPath
  - 类型: string
  - 说明: 必填，日志路径
- logLevel
  - 类型: string
  - 说明: 日志级别，默认为debug

```js
initLogger(logPath, logLevel);
```

### logger

- methodName
  - 类型: string
  - 说明: 必填，方法名
- msg
  - 类型: any
  - 说明: 要打印的信息，可以传多个
- return

```js
// info
logger.info('method info', 'msg1', 'msg2', 'msg3');

// warn
logger.warn('method warn', 'msg1', 'msg2', 'msg3');

// error
logger.error('method error', 'msg1', 'msg2', 'msg3');
```

## ipc

ipc代码

### logIPCInit

主进程中初始化ipc监听，需要和渲染进程中preload对应使用

- logPath
  - 类型: string
  - 说明: 日志存放的位置
- logLevel
  - 类型: string
  - 说明: 日志级别，默认为debug级别

```javascript
logIPCInit();
```

## preload

preload代码，由于preload中不能引入npm包，所以需要手动添加

```javascript
// === log-preload.js ===
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

// === preload.js ===
// electron
import { contextBridge } from 'electron';

// custom preload
import { logIPC } from 'log-preload.js';

// preload
contextBridge.exposeInMainWorld('electron', {
  logIPC,
});

// === 使用 ===
window.electron.logIPC(msg, type);
```
