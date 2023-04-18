// path
const path = require('path');

// icns
const { icns } = require('../index.js');

// test
async function test() {
  const pngPath = path.resolve(__dirname, './pic.png');
  try {
    const res = await icns(pngPath);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
test();
