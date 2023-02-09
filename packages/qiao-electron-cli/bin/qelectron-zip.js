'use strict';

// path
const path = require('path');

// qiao
const qiao = {};
qiao.cli = require('qiao-cli');
qiao.qec = require('../index.js');

// cmd for zip
qiao.cli.cmd.command('zip <configPath>').alias('z').description('zip electron application').action(zip);

// zip
async function zip(configPath) {
  try {
    const cwd = process.cwd();
    if (configPath.startsWith('./')) configPath = path.resolve(cwd, configPath);

    await qiao.qec.zip(require(configPath));

    console.log('zip electron application success!');
    console.log();
  } catch (e) {
    console.log('zip electron application fail!');
    console.log();

    console.log(e);
  }
}
