## qiao-x-update

[![npm version](https://img.shields.io/npm/v/qiao-x-update.svg?style=flat-square)](https://www.npmjs.org/package/qiao-x-update)
[![npm downloads](https://img.shields.io/npm/dm/qiao-x-update.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-x-update)

Electron 中增量更新包相关操作，详见：[Electron-开发实践：几种更新方式](https://blog.vincentqiao.com/electron-update)

## install

安装

```shell
npm i qiao-x-update
```

## use

使用

```javascript
// cjs
const { updateApp } = require('qiao-x-update');

// mjs
import { updateApp } from 'qiao-x-update';
```

## api

### updateApp

使用增量更新的方式更新app

- downloadUrl
  - 类型: string
  - 说明: 增量更新包地址
- appPath
  - 类型: string
  - 说明: app安装的位置，一般是`/Applications/${appName}.app/Contents/Resources/app`
- appVersion
  - 类型: string
  - 说明: 更新的版本号
- useLocalLogger
  - 类型: boolean
  - 说明: 是否使用本地日志，传true需要配合[https://code.vincentqiao.com/#/qiao-x-logger](https://code.vincentqiao.com/#/qiao-x-logger)使用
- return
  - 类型: boolean
  - 说明: 是否成功

```javascript
updateApp(downloadUrl, appPath, appVersion);
```
