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

// cmd for uploadDmg
qiao.cli.cmd.command('uploaddmg <configPath>').alias('ud').description('upload dmg to cos').action(uploadDmg);

// upload dmg
async function uploadDmg(configPath) {
  const methodName = 'uploadDmg';
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

    // upload dmg to cos
    const cosConfigPath = './qiao-electron.upload-dmg.js';
    try {
      const rootPath = path.dirname(configPath);
      const cosConfig = require(path.resolve(rootPath, cosConfigPath));
      config = Object.assign({}, config, cosConfig);
    } catch (error) {
      logger.error(methodName, `can not find ${cosConfigPath}`);
      console.log();
      return;
    }

    const url = await qiao.qec.uploadDmg(config);
    if (!url) {
      logger.info(methodName, 'upload dmg to cos fail!');
      console.log();
      return;
    }

    logger.info(methodName, 'upload dmg to cos success! ');
    logger.info(methodName, 'url', url);
    console.log();
  } catch (e) {
    logger.error(methodName, 'upload dmg to cos fail!');
    console.log();
  }
}
