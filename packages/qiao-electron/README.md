## qiao-electron

[![npm version](https://img.shields.io/npm/v/qiao-electron.svg?style=flat-square)](https://www.npmjs.org/package/qiao-electron)
[![npm downloads](https://img.shields.io/npm/dm/qiao-electron.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-electron)

封装了一些常见的 electron 主进程操作，详见：[一篇文章学会 Electron](https://blog.insistime.com/electron)

## install

```bash
npm i qiao-electron
```

## ipc

提供了一些在渲染进程中可以使用的常见方法

### appGetVersionIPC

```javascript
// 获取app版本号
const res = await window.electron.appGetVersionIPC();
```

### darkModeChangeIPC

```javascript
// 监听mac下黑夜模式的变化
darkModeChangeIPC((isDark) => {
  console.log(isDark);
});
```

### darkModeGetIPC

```javascript
// 获取mac下当前的黑夜模式状态
const res = await window.electron.darkModeGetIPC();
```

### darkModeGetIPC

```javascript
// 获取mac下当前的黑夜模式状态
const res = await window.electron.darkModeGetIPC();
```

### dialogOpenFolderIPC

```javascript
// 打开选择文件夹的dialog，如果选择了文件夹，返回具体的path
const res = await window.electron.dialogOpenFolderIPC();
```

### fsRmIPC

```javascript
// 删除文件或文件夹
const res = await window.electron.fsRmIPC(rmPath);
```

### fsMkdirIPC

```javascript
// 创建一个文件夹
const res = await window.electron.fsMkdirIPC(dir);
```

### fsRenameIPC

```javascript
// 重命名一个文件或文件夹
const res = await window.electron.fsRenameIPC(oldPath, newPath);
```

### fsGetTreeIPC

```javascript
// 获取某个文件夹下的文件树
const res = await window.electron.fsGetTreeIPC(dir, ignores);
```

### fsReadFileIPC

```javascript
// 获取某个文件的内容，直接返回
const res = await window.electron.fsReadFileIPC(filePath);
```

### fsWriteFileIPC

```javascript
// 写一个文件
const res = await window.electron.fsWriteFileIPC(filePath, fileData);
```

### logIPC

```javascript
// 写本地日志
const res = await window.electron.logIPC(msg, type);
```

### lsAllIPC

```javascript
// 获取本地文件维护的key-value所有值
const res = await window.electron.lsAllIPC();
```

### lsGetIPC

```javascript
// 获取本地文件维护的key对应的value值
const res = await window.electron.lsGetIPC(key);
```

### lsSetIPC

```javascript
// 设置本地文件维护的key-value，value可以直接传对象，不用序列化
const res = await window.electron.lsSetIPC(key, value);
```

### lsDelIPC

```javascript
// 删除本地文件维护的key对应的value值
const res = await window.electron.lsDelIPC(key);
```

### shellOpenUrlIPC

```javascript
// 打开一个外部的url
const res = await window.electron.shellOpenUrlIPC(url);
```

### shellShowPathIPC

```javascript
// 打开本地的文件或者文件夹的位置
const res = await window.electron.shellShowPathIPC(path);
```

### shortcutGlobalIPC

```javascript
// 注册全局快捷键
const res = await window.electron.shortcutGlobalIPC(shortcutKey, shortcutCallbackName);
```

### windowResizeIPC

```javascript
// resize窗口大小
const res = await window.electron.windowResizeIPC(width, height);
```

## main

封装一些主进程直接使用的方法

### dialogOpenFolder

```javascript
// 打开一个选择文件夹的dialog
const res = dialogOpenFolder(options);
```

### logInit

```javascript
// 在本地logs文件夹下生成一个date型的electron.log文件，并返回logger
const log = logInit();
```

### ls

```javascript
// 获取本地文件维护的key-value操作对象ls
const ls = ls();
```

### setAboutVersion

```javascript
// 设置关于面板中的版本号
setAboutVersion(version);
```

### setApplicationMenu

```javascript
// 设置系统菜单，如果不传menus会有默认的菜单
setApplicationMenu();
```

### shellOpenURL

```javascript
// 打开一个外部的url
shellOpenURL(url);
```

### shellShowPath

```javascript
// 打开指定path的文件位置或者文件夹位置
shellShowPath(path);
```

### shortcutReg

```javascript
// 注册全局快捷键
shortcutReg(shortcutKey, shortcutCallback);
```

### shortcutUnReg

```javascript
// 注销全局快捷键
shortcutUnReg(shortcutKey);
```
