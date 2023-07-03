// path
const path = require('path');

// electron pakcager
const packager = require('electron-packager');

/**
 * pack
 *  https://electron.github.io/electron-packager/main/interfaces/electronpackager.options.html
 * @param {*} config
 * @returns
 */
module.exports = async function (config) {
  const cwd = process.cwd();

  // darwin
  if (process.platform === 'darwin') {
    // sign and notarize
    const macSignConfigPath = './qiao-electron.mac-sign.js';

    try {
      const macSignConfig = require(path.resolve(cwd, macSignConfigPath));
      config = Object.assign({}, config, macSignConfig);
    } catch (error) {
      console.log(`can not find ${macSignConfigPath}`);
    }
  }

  return await packager(config);
};
