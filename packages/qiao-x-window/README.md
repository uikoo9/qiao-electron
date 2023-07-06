## qiao-x-window

[![npm version](https://img.shields.io/npm/v/qiao-x-window.svg?style=flat-square)](https://www.npmjs.org/package/qiao-x-window)
[![npm downloads](https://img.shields.io/npm/dm/qiao-x-window.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-x-window)

Electron 中 Window 相关的操作封装，[Electron-开发实践：创建 Window](https://blog.insistime.com/electron-window)

## install

安装

```shell
npm i qiao-x-window
```

## use

使用

```javascript
// cjs
const { openWindowByFile } = require('qiao-x-window');

// mjs
import { openWindowByFile } from 'qiao-x-window';
```

## api

### getWindowByEvent

通过本地文件打开窗口

- event
  - 类型: [IpcMainEvent](https://www.electronjs.org/zh/docs/latest/api/structures/ipc-main-event)
  - 说明: IpcMainEvent
- return
  - 类型: BrowserWindow
  - 说明: 创建成功则返回 BrowserWindow 的实例

```javascript
const win = getWindowByEvent(event);
```

### openWindowByFile

通过本地文件打开窗口

- filePath
  - 类型: string
  - 说明: 文件路径
- options
  - 类型: object
  - 说明: 配置文件，详见：[https://www.electronjs.org/zh/docs/latest/api/browser-window#new-browserwindowoptions](https://www.electronjs.org/zh/docs/latest/api/browser-window#new-browserwindowoptions)
- return
  - 类型: BrowserWindow
  - 说明: 创建成功则返回 BrowserWindow 的实例

```javascript
const win = await openWindowByFile(filePath, options);
```

### openWindowByUrl

通过本地文件打开窗口

- url
  - 类型: string
  - 说明: 网页地址
- options
  - 类型: object
  - 说明: 配置文件，详见：[https://www.electronjs.org/zh/docs/latest/api/browser-window#new-browserwindowoptions](https://www.electronjs.org/zh/docs/latest/api/browser-window#new-browserwindowoptions)
- return
  - 类型: BrowserWindow
  - 说明: 创建成功则返回 BrowserWindow 的实例

```javascript
const win = await openWindowByUrl(url, options);
```
