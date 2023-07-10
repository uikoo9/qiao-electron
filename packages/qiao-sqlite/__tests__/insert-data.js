// q
const q = require('../index.js');

// test
async function test() {
  try {
    // db
    const db = await q('./__tests__/test.db');

    // data
    const sql = 'insert into t_project values (?, ?, ?)';
    const res = await db.insertData(sql, ['name', 'appid', 'url']);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

// run
test();
