## electron-icns

[![npm version](https://img.shields.io/npm/v/electron-icns.svg?style=flat-square)](https://www.npmjs.org/package/electron-icns)
[![npm downloads](https://img.shields.io/npm/dm/electron-icns.svg?style=flat-square)](https://npm-stat.com/charts.html?package=electron-icns)

generate electron icns icon

## use

### npx

```shell
npx icns /path/to/your/png/icon
```

### npm global

```shell
npm i -g electron-icns

icns /path/to/your/png/icon
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
    "icns": "icns /path/to/your/png/icon"
  },
}
```

### show

```shell
electron-icns / from /path/to/your/png/icon
electron-icns / tmpdir / success
electron-icns / sips... 10/10
electron-icns / iconutil / success
electron-icns / delete tmp.iconset / success
electron-icns / success /path/to/icns/icon
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
