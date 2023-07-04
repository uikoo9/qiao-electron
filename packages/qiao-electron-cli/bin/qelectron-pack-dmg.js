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

    // custom dmg
    const macDmgConfigPath = './qiao-electron.mac-dmg.js';

    try {
      const rootPath = path.dirname(configPath);
      const macDmgConfig = require(path.resolve(rootPath, macDmgConfigPath));
      config = Object.assign({}, config, macDmgConfig);
    } catch (error) {
      console.log(`can not find ${macDmgConfigPath}`);
    }

    await qiao.qec.packDmg(config);

    console.log('pack electron application for mac dmg success!');
    console.log();
  } catch (e) {
    console.log('pack electron application for mac dmg fail!');
    console.log();

    console.log(e);
  }
}
