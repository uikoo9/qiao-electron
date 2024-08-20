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

// cmd for packwin
qiao.cli.cmd
  .command('packwin <configPath>')
  .alias('pw')
  .description('pack electron application for windows installer')
  .action(packWin);

// pack win
async function packWin(configPath) {
  const methodName = 'packWin';
  if (process.platform !== 'win32') {
    logger.info(methodName, 'This command only takes effect on Windows systems.');
    console.log();
    return;
  }

  try {
    const cwd = process.cwd();
    if (configPath.startsWith('./')) configPath = path.resolve(cwd, configPath);

    // config
    let config = require(configPath);

    // pack
    await qiao.qec.packWin(config);

    logger.info(methodName, 'pack electron application for windows installer success!');
    console.log();
  } catch (e) {
    logger.error(methodName, 'pack electron application for windows installer fail!', e);
    console.log();
  }
}
