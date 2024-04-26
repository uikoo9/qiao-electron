## qiao-x-dialog

[![npm version](https://img.shields.io/npm/v/qiao-x-dialog.svg?style=flat-square)](https://www.npmjs.org/package/qiao-x-dialog)
[![npm downloads](https://img.shields.io/npm/dm/qiao-x-dialog.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-x-dialog)

Electron 中 Dialog 相关的操作封装

## install

安装

```shell
npm i qiao-x-dialog
```

## use

使用

```javascript
// cjs
const { dialogOpenFile } = require('qiao-x-dialog');

// mjs
import { dialogOpenFile } from 'qiao-x-dialog';
```

## main

主进程代码

### dialogOpenFile

打开选择文件的对话框

- options
  - 类型: Object
  - 说明:
    - 新增options.files选项，用来过滤文件，例如`options.files=['png'];`
    - 新增options.win选项，如果传入，对话框会和传入的win绑定
    - 详见：[https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowopendialogbrowserwindow-options](https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowopendialogbrowserwindow-options)
- return
  - 类型: Object
  - 说明: 返回是否取消以及文件或文件夹路径
  ```javascript
  {
    canceled: false,
    filePaths: []
  }
  ```

```javascript
await dialogOpenFile(options);
```

### dialogOpenFolder

打开选择文件夹的对话框

- options
  - 类型: Object
  - 说明:
    - 新增options.win选项，如果传入，对话框会和传入的win绑定
    - 详见：[https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowopendialogbrowserwindow-options](https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowopendialogbrowserwindow-options)
- return
  - 类型: Object
  - 说明: 返回是否取消以及文件或文件夹路径
  ```javascript
  {
    canceled: false,
    filePaths: []
  }
  ```

```javascript
await dialogOpenFolder(options);
```

### dialogOpenFileAndFolder

打开选择文件和文件夹的对话框

- options
  - 类型: Object
  - 说明:
    - 新增options.files选项，用来过滤文件，例如`options.files=['png'];`
    - 新增options.win选项，如果传入，对话框会和传入的win绑定
    - 详见：[https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowopendialogbrowserwindow-options](https://www.electronjs.org/zh/docs/latest/api/dialog#dialogshowopendialogbrowserwindow-options)
- return
  - 类型: Object
  - 说明: 返回是否取消以及文件或文件夹路径
  ```javascript
  {
    canceled: false,
    filePaths: []
  }
  ```

```javascript
await dialogOpenFileAndFolder(options);
```

## ipc

ipc代码

### dialogIPCInit

主进程中初始化ipc监听，需要和渲染进程中preload对应使用

```javascript
dialogIPCInit();
```

## preload

preload代码，由于preload中不能引入npm包，所以需要手动添加

```javascript
// === dialog-ipc.js ===
// electron
import { ipcRenderer } from 'electron';

/**
 * dialogOpenFileIPC
 * @param {*} options
 */
export const dialogOpenFileIPC = async (options) => {
  return await ipcRenderer.invoke('ipc-dialog-open-file', options);
};

/**
 * dialogOpenFolderIPC
 * @param {*} options
 */
export const dialogOpenFolderIPC = async (options) => {
  return await ipcRenderer.invoke('ipc-dialog-open-folder', options);
};

/**
 * dialogOpenFileAndFolderIPC
 * @param {*} options
 */
export const dialogOpenFileAndFolderIPC = async (options) => {
  return await ipcRenderer.invoke('ipc-dialog-open-file-folder', options);
};

// === preload.js ===
// electron
import { contextBridge } from 'electron';

// custom preload
import { dialogOpenFileIPC, dialogOpenFolderIPC, dialogOpenFileAndFolderIPC } from 'dialog-preload.js';

// preload
contextBridge.exposeInMainWorld('electron', {
  dialogOpenFileIPC,
  dialogOpenFolderIPC,
  dialogOpenFileAndFolderIPC,
});

// === 使用 ===
await window.electron.dialogOpenFileIPC(options);
```
