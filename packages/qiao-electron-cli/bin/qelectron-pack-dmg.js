'use strict';

// path
const path = require('path');

// logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-electron-cli');

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
  const methodName = 'packDmg';
  if (process.platform !== 'darwin') {
    logger.info(methodName, 'This command only takes effect on Mac systems.');
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
      logger.error(methodName, `can not find ${macDmgConfigPath}`);
    }

    await qiao.qec.packDmg(config);

    logger.info(methodName, 'pack electron application for mac dmg success!');
    console.log();
  } catch (e) {
    logger.error(methodName, 'pack electron application for mac dmg fail!', e);
    console.log();
  }
}
