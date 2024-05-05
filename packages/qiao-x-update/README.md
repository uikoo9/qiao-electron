## qiao-x-update

[![npm version](https://img.shields.io/npm/v/qiao-x-update.svg?style=flat-square)](https://www.npmjs.org/package/qiao-x-update)
[![npm downloads](https://img.shields.io/npm/dm/qiao-x-update.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-x-update)

Electron 中增量更新包相关操作

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
- return
  - 类型: boolean
  - 说明: 是否成功

```javascript
updateApp(downloadUrl, appPath, appVersion);
```
