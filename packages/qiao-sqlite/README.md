## qiao-sqlite

[![npm version](https://img.shields.io/npm/v/qiao-sqlite.svg?style=flat-square)](https://www.npmjs.org/package/qiao-sqlite)
[![npm downloads](https://img.shields.io/npm/dm/qiao-sqlite.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-sqlite)

本地数据库 sqlite 常见 api 封装，详见：[一篇文章学会 SQLite](https://blog.vincentqiao.com/sqlite)

## install

```shell
npm i qiao-sqlite
```

## use

使用

```javascript
// cjs
const DB = require('qiao-sqlite');

// mjs
import DB from 'qiao-sqlite';
```

## api

### DB

创建 DB 实例

- databaseName
  - 类型: string
  - 说明: 数据库名称
- return
  - 类型: db
  - 说明: DB 实例

```javascript
const db = await DB(databaseName);
```

### createTable

创建表格

- sql
  - 类型: string
  - 说明: 创建表格的 sql
- return
  - 类型: boolean
  - 说明: 成功返回 true

```javascript
const res = await db.createTable(sql);
```

### dropTable

删除表格

- tableName
  - 类型: string
  - 说明: 表格名
- return
  - 类型: boolean
  - 说明: 成功返回 true

```javascript
const res = await db.dropTable(tableName);
```

### showTables

列出表格

- return
  - 类型: string[]
  - 说明: 表格名数组

```javascript
const res = await db.showTables();
```

### insertData

插入数据

- sql
  - 类型: string
  - 说明: 插入数据的 sql
- params
  - 类型: string
  - 说明: 插入数据的 params
- return
  - 类型: boolean
  - 说明: 成功返回 true

```javascript
const res = await db.insertData(sql, params);
```

### deleteData

删除数据

- sql
  - 类型: string
  - 说明: 删除数据的 sql
- params
  - 类型: string
  - 说明: 删除数据的 params
- return
  - 类型: boolean
  - 说明: 成功返回 true

```javascript
const res = await db.deleteData(sql, params);
```

### modifyData

修改数据

- sql
  - 类型: string
  - 说明: 修改数据的 sql
- params
  - 类型: string
  - 说明: 修改数据的 params
- return
  - 类型: boolean
  - 说明: 成功返回 true

```javascript
const res = await db.modifyData(sql, params);
```

### selectData

查询数据

- sql
  - 类型: string
  - 说明: 查询数据的 sql
- params
  - 类型: string
  - 说明: 查询数据的 params
- return
  - 类型: object[]
  - 说明: 表格内数据列表

```javascript
const rows = await db.selectData(sql, params);
```
