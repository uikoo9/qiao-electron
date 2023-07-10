// q
const q = require('../index.js');

// test
async function test() {
  try {
    // db
    const db = await q('./__tests__/test.db');

    // show
    const rows = await db.showTables();
    console.log(rows);
  } catch (e) {
    console.log(e);
  }
}

// run
test();
