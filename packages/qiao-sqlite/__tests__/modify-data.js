// q
const q = require('../index.js');

// test
async function test() {
  try {
    // db
    const db = await q('./__tests__/test.db');

    // data
    const sql = 'update t_project set project_name=?';
    const res = await db.modifyData(sql, ['name1']);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

// run
test();
