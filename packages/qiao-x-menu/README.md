## qiao-x-menu

[![npm version](https://img.shields.io/npm/v/qiao-x-menu.svg?style=flat-square)](https://www.npmjs.org/package/qiao-x-menu)
[![npm downloads](https://img.shields.io/npm/dm/qiao-x-menu.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-x-menu)

Electron 中 Menu 相关的操作封装

## install

安装

```shell
npm i qiao-x-menu
```

## use

使用

```javascript
// cjs
const { setApplicationMenu } = require('qiao-x-menu');

// mjs
import { setApplicationMenu } from 'qiao-x-menu';
```

## api

### setApplicationMenu

通过本地文件打开窗口

- menus
  - 类型: object[]
  - 说明: menu 数组，不传使用下面默认数组
  - ```javascript
    [
      {
        label: 'app',
        submenu: [
          {
            label: '关于',
            role: 'about',
          },
          {
            type: 'separator',
          },
          {
            label: '隐藏',
            role: 'hide',
          },
          {
            label: '隐藏其他',
            role: 'hideOthers',
          },
          {
            type: 'separator',
          },
          {
            label: '退出',
            role: 'quit',
          },
        ],
      },
      {
        label: '编辑',
        submenu: [
          {
            label: '撤销',
            role: 'undo',
          },
          {
            label: '重做',
            role: 'redo',
          },
          {
            type: 'separator',
          },
          {
            label: '剪切',
            role: 'cut',
          },
          {
            label: '复制',
            role: 'copy',
          },
          {
            label: '粘贴',
            role: 'paste',
          },
          {
            label: '删除',
            role: 'delete',
          },
          {
            label: '选中所有',
            role: 'selectAll',
          },
        ],
      },
      {
        label: '窗口',
        submenu: [
          {
            label: '最小化',
            role: 'minimize',
          },
          {
            label: '关闭',
            role: 'close',
          },
          {
            label: '自动全屏',
            role: 'togglefullscreen',
          },
        ],
      },
      {
        label: '调试',
        submenu: [
          {
            label: '调试',
            role: 'toggleDevTools',
          },
        ],
      },
    ];
    ```

```javascript
setApplicationMenu(menus);
```
