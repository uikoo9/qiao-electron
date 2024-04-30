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

// cmd for zip
qiao.cli.cmd.command('zip <configPath>').alias('z').description('zip electron application').action(zip);

// zip
async function zip(configPath) {
  const methodName = 'zip';
  try {
    const cwd = process.cwd();
    if (configPath.startsWith('./')) configPath = path.resolve(cwd, configPath);

    await qiao.qec.zip(require(configPath));

    console.log();
    logger.info(methodName, 'zip electron application success!');
    console.log();
  } catch (e) {
    logger.error(methodName, 'zip electron application fail!', e);
    console.log();
  }
}
