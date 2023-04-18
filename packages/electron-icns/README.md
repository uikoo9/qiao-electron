## electron-icns

[![npm version](https://img.shields.io/npm/v/electron-icns.svg?style=flat-square)](https://www.npmjs.org/package/electron-icns)
[![npm downloads](https://img.shields.io/npm/dm/electron-icns.svg?style=flat-square)](https://npm-stat.com/charts.html?package=electron-icns)

generate electron icns icon

## use

### npx

```shell
npx icns icon /path/to/your/png/icon
```

### npm global

```shell
npm i -g electron-icns

icns icon /path/to/your/png/icon
```

### dev dependencies

1. install

```shell
npm i -D electron-icns
```

2. use npm scripts

```javascript
{
  "scripts": {
    "icns": "icns icon /path/to/your/png/icon"
  },
}
```

### js api

```javascript
// cjs
const { icns } = require('electron-icns');

// mjs
import { icns } from 'electron-icns';
```

## api

### icns

generate electron icns icon

- pngPath
  - type: string
  - desc: png path
- return
  - 类型: string
  - 说明: icns path

```javascript
await icns(pngPath);
```
