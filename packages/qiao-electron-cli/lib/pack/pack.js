// electron pakcager
const packager = require('electron-packager');
const { serialHooks } = require('electron-packager/src/hooks');

// version update
const { versionUpdate } = require('./pack-update.js');
const { afterPack } = require('./pack-after.js');

// logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-electron-cli');

/**
 * pack
 *  https://electron.github.io/electron-packager/main/interfaces/electronpackager.options.html
 * @param {*} config
 * @returns
 */
module.exports = async function (config) {
  // version update
  if (config.versionUpdate) {
    const versionUpdateRes = await versionUpdate(config);
    if (!versionUpdateRes) {
      logger.info('pack.js', 'versionUpdateRes', versionUpdateRes);
      return;
    }

    // hooks
    config.afterInitialize = [serialHooks([afterPack])];
  }

  // log
  logger.info('pack.js', 'pack electron application by qiao-electron-cli:');
  logger.info('pack.js', 'config', config);
  console.log();

  // pack
  return await packager(config);
};
