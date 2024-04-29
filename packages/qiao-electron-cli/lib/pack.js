// electron pakcager
const packager = require('electron-packager');
const { serialHooks } = require('electron-packager/src/hooks');

/**
 * pack
 *  https://electron.github.io/electron-packager/main/interfaces/electronpackager.options.html
 * @param {*} config
 * @returns
 */
module.exports = async function (config) {
  // hooks
  if (config.afterInitialize) config.afterInitialize = [serialHooks([config.afterInitialize])];

  // log
  console.log('pack electron application by qiao-electron-cli:');
  console.log(config);
  console.log();

  // pack
  return await packager(config);
};
