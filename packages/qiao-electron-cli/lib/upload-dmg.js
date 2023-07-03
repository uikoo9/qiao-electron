// path
const path = require('path');

// q
const q = require('qiao-cos');

/**
 * upload dmg
 * @param {*} config
 * @returns
 */
module.exports = async function (config) {
  const cwd = process.cwd();

  // darwin
  if (process.platform === 'darwin') {
    // upload dmg to cos
    const cosConfigPath = './qiao-electron.upload-dmg.js';

    try {
      const cosConfig = require(path.resolve(cwd, cosConfigPath));
      config = Object.assign({}, config, cosConfig);
    } catch (error) {
      console.log(`can not find ${cosConfigPath}`);
      return;
    }
  }

  // cos config
  const cosConfig = config.cosConfig;
  const client = q(cosConfig);

  // vars
  const outPath = config.out;
  const arch = config.arch;
  const appName = config.name;
  const appVersion = config.appVersion;

  // dest path
  const root = process.cwd();
  const dmgName = `${appName}-${appVersion}-${arch}`;
  const dmgPath = path.resolve(root, `${outPath}/dmg/${dmgName}.dmg`);
  const destPath = `${cosConfig.destPath}${dmgName}.dmg`;

  // rs
  const rs = await client.uploadFile(destPath, dmgPath);
  if (!rs || !rs.Location) return;

  // return
  return `https://${rs.Location}`;
};
