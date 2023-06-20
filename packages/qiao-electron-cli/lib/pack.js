// electron pakcager
const packager = require('electron-packager');

/**
 * pack
 * @param {*} config
 * @returns
 */
module.exports = async function (config) {
  // packager
  return await packager(config);
};
