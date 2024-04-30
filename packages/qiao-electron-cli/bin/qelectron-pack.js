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

// cmd for packmac
qiao.cli.cmd.command('packmac <configPath>').alias('pm').description('pack electron application').action(pack);

// cmd for packwin
qiao.cli.cmd.command('packwin <configPath>').alias('pw').description('pack electron application').action(pack);

// pack
async function pack(configPath) {
  const methodName = 'pack';

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
        logger.error(methodName, `can not find ${macSignConfigPath}`);
      }
    }

    // pack
    await qiao.qec.pack(config);

    console.log();
    logger.info(methodName, 'pack electron application success!');
    console.log();
  } catch (e) {
    logger.error(methodName, 'pack electron application fail!', e);
    console.log();
  }
}
