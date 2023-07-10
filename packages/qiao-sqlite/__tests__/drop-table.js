// q
const q = require('../index.js');

// test
async function test() {
  try {
    // db
    const db = await q('./__tests__/test.db');

    console.log(await db.showTables());
    const res = await db.dropTable('t_project');
    console.log(res);
    console.log(await db.showTables());
  } catch (e) {
    console.log(e);
  }
}

// run
test();
