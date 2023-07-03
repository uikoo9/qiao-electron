'use strict';

// path
const path = require('path');

// qiao
const qiao = {};
qiao.cli = require('qiao-cli');
qiao.qec = require('../index.js');

// cmd for uploadDmg
qiao.cli.cmd.command('uploaddmg <configPath>').alias('ud').description('upload dmg to cos').action(uploadDmg);

// upload dmg
async function uploadDmg(configPath) {
  if (process.platform !== 'darwin') {
    console.log('This command only takes effect on Mac systems.');
    console.log();
    return;
  }

  try {
    const cwd = process.cwd();
    if (configPath.startsWith('./')) configPath = path.resolve(cwd, configPath);

    // config
    let config = require(configPath);

    // upload dmg to cos
    const cosConfigPath = './qiao-electron.upload-dmg.js';
    try {
      const rootPath = path.dirname(configPath);
      const cosConfig = require(path.resolve(rootPath, cosConfigPath));
      config = Object.assign({}, config, cosConfig);
    } catch (error) {
      console.log(`can not find ${cosConfigPath}`);
      console.log();
      return;
    }

    const url = await qiao.qec.uploadDmg(config);
    if (!url) {
      console.log('upload dmg to cos fail!');
      console.log();
      return;
    }

    console.log('upload dmg to cos success! ');
    console.log(url);
    console.log();
  } catch (e) {
    console.log('upload dmg to cos fail!');
    console.log();

    console.log(e);
  }
}
