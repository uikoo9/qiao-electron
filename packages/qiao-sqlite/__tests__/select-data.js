// q
const q = require('../index.js');

// test
async function test() {
  try {
    // db
    const db = await q('./__tests__/test.db');

    // sql
    const sql = 'SELECT rowid,* FROM t_project';
    const rows = await db.selectData(sql);
    console.log(rows);
  } catch (e) {
    console.log(e);
  }
}

// run
test();
