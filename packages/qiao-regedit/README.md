## qiao-regedit

[![npm version](https://img.shields.io/npm/v/qiao-regedit.svg?style=flat-square)](https://www.npmjs.org/package/qiao-regedit)
[![npm downloads](https://img.shields.io/npm/dm/qiao-regedit.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-regedit)

nodejs 操作 windows 注册表

## install

安装

```shell
npm i qiao-regedit
```

## use

使用

```javascript
// cjs
const { addValue } = require('qiao-regedit');

// mjs
import { addValue } from 'qiao-regedit';
```

## api

### addValue

添加值

- options.key
  - 类型: string
  - 说明: key
- options.name
  - 类型: string
  - 说明: name
- options.data
  - 类型: string
  - 说明: data
- callback
  - 类型: function
  - 说明: 添加成功的回调函数

```javascript
const options = {
  key: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
  name: 'test',
  data: 'haha',
};

addValue(options, (res) => {
  console.log(res);
});
```

### delValue

删除值

- options.key
  - 类型: string
  - 说明: key
- options.name
  - 类型: string
  - 说明: name
- callback
  - 类型: function
  - 说明: 删除成功的回调函数

```javascript
const options = {
  key: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
  name: 'test',
};

delValue(options, (res) => {
  console.log(res);
});
```

### listValues

列出值

- key
  - 类型: string
  - 说明: key
- callback
  - 类型: function
  - 说明: 列出成功的回调函数

```javascript
const key = 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';
listValues(key, (err, res) => {
  console.log(err, res);
});
```
