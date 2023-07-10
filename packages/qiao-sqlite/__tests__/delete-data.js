// q
const q = require('../index.js');

// test
async function test() {
  try {
    // db
    const db = await q('./__tests__/test.db');

    // data
    const sql = 'delete from t_project where rowid=?';
    const res = await db.deleteData(sql, [1]);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

// run
test();
