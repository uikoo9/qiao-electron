## qiao-x-logger

[![npm version](https://img.shields.io/npm/v/qiao-x-logger.svg?style=flat-square)](https://www.npmjs.org/package/qiao-x-logger)
[![npm downloads](https://img.shields.io/npm/dm/qiao-x-logger.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-x-logger)

Electron 中日志相关的操作封装

## install

安装

```shell
npm i qiao-x-logger
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
logIPCInit(logPath, logLevel);
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
await window.electron.logIPC(msg, type);
```
