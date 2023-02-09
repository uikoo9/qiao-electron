'use strict';

// path
const path = require('path');

// qiao
const qiao = {};
qiao.cli = require('qiao-cli');
qiao.qec = require('../index.js');

// cmd for icns
qiao.cli.cmd.command('icns <iconPath>').description('generate electron application icon').action(icns);

// generate icns
async function icns(iconPath) {
  try {
    const cwd = process.cwd();
    if (iconPath.startsWith('./')) iconPath = path.resolve(cwd, iconPath);

    qiao.qec.icns(iconPath);
  } catch (e) {
    console.log('generate electron application icon fail!');
    console.log();

    console.log(e);
  }
}
