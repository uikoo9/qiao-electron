// q
const q = require('../index.js');

// test
async function test() {
  try {
    const db = await q('./__tests__/test.db');
    console.log(db);
  } catch (error) {
    console.log(error);
  }
}

// run
test();
