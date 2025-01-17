## qiao-electron-cli

[![npm version](https://img.shields.io/npm/v/qiao-electron-cli.svg?style=flat-square)](https://www.npmjs.org/package/qiao-electron-cli)
[![npm downloads](https://img.shields.io/npm/dm/qiao-electron-cli.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-electron-cli)

electron 脚手架，详见：[一篇文章学会 Electron](https://blog.vincentqiao.com/electron)

## 官网

[https://qiao-electron-cli.vincentqiao.com/#/](https://qiao-electron-cli.vincentqiao.com/#/)

## install

```bash
npm i -D qiao-electron-cli
```

## config

配置文件 qiao-electron.config.js

```javascript
'use strict';

// 主进程下的package.json
const srcPkg = require('../src/app/package.json');

// config
let config = {
  // app环境，online，test之类的，会拼接在dmg安装包名上
  appEnv: 'online',

  // app名称，默认从主进程下的package.json中获取
  appName: srcPkg.name,

  // app版本号，会显示在dmg安装包名以及关于面板上，默认从主进程下的package.json中获取
  appVersion: srcPkg.version,

  // app应用图标，mac下自动寻找icon.icns，windows下自动寻找icon.ico
  appIconPath: 'pack/icon/icon',

  // app权限声明，会显示在关于面板上
  appCopyright: 'Copyright © 2022 xxx版权所有',

  // app操作系统，mac下如果输入universal会打一个支持x64和arm64的包
  arch: 'arm64',

  // app应用包中的app文件夹是否使用asar格式，默认为false
  asar: false,

  // app中主进程src路径
  srcPath: 'src',

  // 最终要打包到app应用包中的文件和文件夹，在dist这一步会复制出去
  srcFiles: ['main', 'node_modules', 'renderer', 'package.json'],

  // srcFiles中的文件和文件夹会复制到这个目录
  distPath: 'dist',

  // app应用包及dmg安装包生成的路径
  outPath: 'out',

  // app安装包dmg中的背景图，不填则使用默认背景图
  dmgBackground: 'pack/static/bg.png',
};

// cos config，可以配置cos，直接上传到cos上
const cosConfig = require('./cos-config.json');
config.cosConfig = {
  SecretId: cosConfig.SecretId,
  SecretKey: cosConfig.SecretKey,
  Region: cosConfig.Region,
  Bucket: cosConfig.Bucket,
  destPath: 'xx/xx/xx/',
};

// qe config
module.exports = config;
```

## cli

### init

初始化一个 electron 项目

```bash
qelectron init /{youprojectpath}
```

### packmac

打包 mac 下应用

```bash
qelectron packmac|pm /{yourconfigpath}/qiao-electron.config.js
```

### zip

将 app 应用打包 zip 文件

```bash
qelectron zip|z /{yourconfigpath}/qiao-electron.config.js
```

### packdmg

打包 mac 下安装包 dmg 文件

```bash
qelectron packdmg|pd /{yourconfigpath}/qiao-electron.config.js
```

### uploaddmg

上传 dmg 文件到 cos

```bash
qelectron uploaddmg|ud /{yourconfigpath}/qiao-electron.config.js
```
