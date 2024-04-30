## qiao-x-app

[![npm version](https://img.shields.io/npm/v/qiao-x-app.svg?style=flat-square)](https://www.npmjs.org/package/qiao-x-app)
[![npm downloads](https://img.shields.io/npm/dm/qiao-x-app.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-x-app)

Electron 中 APP 相关的操作封装

## install

安装

```shell
npm i qiao-x-app
```

## ipc

ipc代码

### appIPCInit

主进程中初始化ipc监听，需要和渲染进程中preload对应使用

```javascript
appIPCInit();
```

## preload

preload代码，由于preload中不能引入npm包，所以需要手动添加

```javascript
// === app-preload.js ===
// electron
import { ipcRenderer } from 'electron';

/**
 * appGetVersionIPC
 * @returns version
 */
export const appGetVersionIPC = async () => {
  return await ipcRenderer.invoke('ipc-app-get-version');
};

// === preload.js ===
// electron
import { contextBridge } from 'electron';

// custom preload
import { appGetVersionIPC } from 'app-preload.js';

// preload
contextBridge.exposeInMainWorld('electron', {
  appGetVersionIPC,
});

// === 使用 ===
await window.electron.appGetVersionIPC();
```
