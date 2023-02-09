'use strict';

// path
const path = require('path');

// qiao
const qiao = {};
qiao.cli = require('qiao-cli');
qiao.qec = require('../index.js');

// cmd for packdmg
qiao.cli.cmd
  .command('packdmg <configPath>')
  .alias('pd')
  .description('pack electron application for mac dmg')
  .action(packDmg);

// pack dmg
async function packDmg(configPath) {
  try {
    const cwd = process.cwd();
    if (configPath.startsWith('./')) configPath = path.resolve(cwd, configPath);

    await qiao.qec.packDmg(require(configPath));

    console.log('pack electron application for mac dmg success!');
    console.log();
  } catch (e) {
    console.log('pack electron application for mac dmg fail!');
    console.log();

    console.log(e);
  }
}
