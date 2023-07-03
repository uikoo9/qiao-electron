'use strict';

// path
const path = require('path');

// qiao
const qiao = {};
qiao.cli = require('qiao-cli');
qiao.qec = require('../index.js');

// cmd for packmac
qiao.cli.cmd.command('packmac <configPath>').alias('pm').description('pack electron application').action(pack);

// cmd for packwin
qiao.cli.cmd.command('packwin <configPath>').alias('pw').description('pack electron application').action(pack);

// pack
async function pack(configPath) {
  try {
    // config path
    const cwd = process.cwd();
    if (configPath.startsWith('./')) configPath = path.resolve(cwd, configPath);

    // config
    let config = require(configPath);

    // darwin
    if (process.platform === 'darwin') {
      // sign and notarize
      const macSignConfigPath = './qiao-electron.mac-sign.js';

      try {
        const rootPath = path.dirname(configPath);
        const macSignConfig = require(path.resolve(rootPath, macSignConfigPath));
        config = Object.assign({}, config, macSignConfig);
      } catch (error) {
        console.log(`can not find ${macSignConfigPath}`);
      }
    }

    // pack
    await qiao.qec.pack(config);

    console.log('pack electron application success!');
    console.log();
  } catch (e) {
    console.log('pack electron application fail!');
    console.log();

    console.log(e);
  }
}
