## qiao-sqlite

[![npm version](https://img.shields.io/npm/v/qiao-sqlite.svg?style=flat-square)](https://www.npmjs.org/package/qiao-sqlite)
[![npm downloads](https://img.shields.io/npm/dm/qiao-sqlite.svg?style=flat-square)](https://npm-stat.com/charts.html?package=qiao-sqlite)

本地数据库 sqlite 常见 api 封装，详见：[一篇文章学会 SQLite](https://blog.insistime.com/sqlite)

## api

### createDB

创建数据库

```javascript
'use strict';

// q
var q = require('qiao-sqlite');

// db
var db = q.createDB('./__tests__/test.db');
console.log(db);
```

### createTable

创建表格

```javascript
'use strict';

// q
var q = require('qiao-sqlite');

// db
var db = q.createDB('./__tests__/test.db');

// table
var sql = 'CREATE TABLE if not exists t_project (project_name TEXT, project_appid TEXT, project_icon_url TEXT)';

// test
async function test() {
  try {
    await q.createTable(db, sql);
  } catch (e) {
    console.log(e);
  }
}

// run
test();
```

### dropTable

删除表格

```javascript
'use strict';

// q
var q = require('qiao-sqlite');

// db
var db = q.createDB('./__tests__/test.db');

// test
async function test() {
  try {
    console.log(await q.showTables(db));
    await q.dropTable(db, 't_project');
    console.log(await q.showTables(db));
  } catch (e) {
    console.log(e);
  }
}

// run
test();
```

### showTables

列出表格

```javascript
'use strict';

// q
var q = require('qiao-sqlite');

// db
var db = q.createDB('./__tests__/test.db');

// test
async function test() {
  try {
    const rows = await q.showTables(db);
    console.log(rows);
  } catch (e) {
    console.log(e);
  }
}

// run
test();
```

### insertData

插入数据

```javascript
'use strict';

// q
var q = require('qiao-sqlite');

// db
var db = q.createDB('./__tests__/test.db');

// data
var sql = 'insert into t_project values (?, ?, ?)';

// test
async function test() {
  try {
    await q.insertData(db, sql, ['name', 'appid', 'url']);
  } catch (e) {
    console.log(e);
  }
}

// run
test();
```

### deleteData

删除数据

```javascript
'use strict';

// q
var q = require('qiao-sqlite');

// db
var db = q.createDB('./__tests__/test.db');

// data
var sql = 'delete from t_project where rowid=?';

// test
async function test() {
  try {
    await q.deleteData(db, sql, [1]);
  } catch (e) {
    console.log(e);
  }
}

// run
test();
```

### modifyData

修改数据

```javascript
'use strict';

// q
var q = require('qiao-sqlite');

// db
var db = q.createDB('./__tests__/test.db');

// data
var sql = 'update t_project set project_name=?';

// test
async function test() {
  try {
    await q.modifyData(db, sql, ['name1']);
  } catch (e) {
    console.log(e);
  }
}

// run
test();
```

### selectData

查询数据

```javascript
'use strict';

// q
var q = require('qiao-sqlite');

// db
var db = q.createDB('./__tests__/test.db');

// sql
var sql = 'SELECT rowid,* FROM t_project';

// test
async function test() {
  try {
    var rows = await q.selectData(db, sql);
    console.log(rows);
  } catch (e) {
    console.log(e);
  }
}

// run
test();
```
