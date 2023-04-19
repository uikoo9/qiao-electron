## electron-icns

[![npm version](https://img.shields.io/npm/v/electron-icns.svg?style=flat-square)](https://www.npmjs.org/package/electron-icns)
[![npm downloads](https://img.shields.io/npm/dm/electron-icns.svg?style=flat-square)](https://npm-stat.com/charts.html?package=electron-icns)

A tool for generating icns icons for use with Electron on macOS

## use

### npx

```shell
npx electron-icns /path/to/your/png/icon
```

### npm global

```shell
npm i -g electron-icns

electron-icns /path/to/your/png/icon
```

### dev dependencies

install

```shell
npm i -D electron-icns
```

use npm scripts

```javascript
{
  "scripts": {
    "icns": "electron-icns /path/to/your/png/icon"
  },
}
```

### show

```shell
electron-icns / from /path/to/your/png/icon
electron-icns / tmpdir / success
electron-icns / sips... 10/10
electron-icns / iconutil / success
electron-icns / rmTempDir / success
electron-icns / success /path/to/icns/icon
```

## api

### icns

generate electron mac icns icon

- pngPath
  - type: string
  - desc: png path
- return
  - type: string
  - desc: icns path

```javascript
// cjs
const { icns } = require('electron-icns');

// mjs
import { icns } from 'electron-icns';

// icns
const icnsPath = await icns(pngPath);
```
