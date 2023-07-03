// electron pakcager
const packager = require('electron-packager');

/**
 * pack
 *  https://electron.github.io/electron-packager/main/interfaces/electronpackager.options.html
 * @param {*} config
 * @returns
 */
module.exports = async function (config) {
  console.log('pack electron application by qiao-electron-cli:');
  console.log(config);
  console.log();

  return await packager(config);
};
