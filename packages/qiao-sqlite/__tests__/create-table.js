// q
const q = require('../index.js');

// test
async function test() {
  try {
    // db
    const db = await q('./__tests__/test.db');
    const sql = 'CREATE TABLE if not exists t_project (project_name TEXT, project_appid TEXT, project_icon_url TEXT)';

    // res
    const res = await db.createTable(sql);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

// run
test();
