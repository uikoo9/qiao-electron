## qiao-x-shortcut

[![npm version](https://img.shields.io/npm/v/qiao-x-shortcut.svg?style=flat-square)](https://www.npmjs.org/package/qiao-x-shortcut)
[![npm downloads](https://img.shields.io/npm/dm/qiao-x-shortcut.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-x-shortcut)

Electron 中快捷键相关的操作封装，详见：[Electron-开发实践：注册快捷键](https://blog.vincentqiao.com/electron-shortcut)

## install

安装

```shell
npm i qiao-x-shortcut
```

## use

使用

```javascript
// cjs
const { shortcutReg } = require('qiao-x-shortcut');

// mjs
import { shortcutReg } from 'qiao-x-shortcut';
```

## main

主进程代码

### initShortcut

取消所有已注册的快捷键在app退出时

```javascript
shortcutInit();
```

### shortcutReg

注册快捷键

- shortcutKey
  - 类型: string
  - 说明: 要注册的快捷键，常见的快捷键：[https://www.electronjs.org/docs/latest/api/accelerator](https://www.electronjs.org/docs/latest/api/accelerator)
- shortcutCallback
  - 类型: function
  - 说明: 快捷键对应的回调函数
- return
  - 类型: boolean
  - 说明: 是否注册成功

```javascript
shortcutReg(shortcutKey, shortcutCallback);
```

### shortcutUnReg

取消注册快捷键

- shortcutKey
  - 类型: string
  - 说明: 要取消注册的快捷键，常见的快捷键：[https://www.electronjs.org/docs/latest/api/accelerator](https://www.electronjs.org/docs/latest/api/accelerator)
- return
  - 类型: boolean
  - 说明: 是否取消注册成功

```javascript
shortcutUnReg(shortcutKey);
```

## ipc

ipc代码

### shortcutIPCInit

主进程中初始化ipc监听，需要和渲染进程中preload对应使用

- functions
  - 类型: array
  - 说明: 对象数组，对象属性为shortcutCallbackName和对应的shortcutCallbackFunction

```javascript
shortcutIPCInit(functions);
```

## preload

preload代码，由于preload中不能引入npm包，所以需要手动添加

```javascript
// === shortcut-preload.js ===
// electron
import { ipcRenderer } from 'electron';

/**
 * shortcutGlobalIPC
 * @returns res
 */
export const shortcutGlobalIPC = async (shortcutKey, shortcutCallbackName) => {
  return await ipcRenderer.invoke('ipc-shortcut-global', shortcutKey, shortcutCallbackName);
};

// === preload.js ===
// electron
import { contextBridge } from 'electron';

// custom preload
import { shortcutGlobalIPC } from 'shortcut-preload.js';

// preload
contextBridge.exposeInMainWorld('electron', {
  shortcutGlobalIPC,
});

// === 使用 ===
await window.electron.shortcutGlobalIPC(shortcutKey, shortcutCallbackName);
```
