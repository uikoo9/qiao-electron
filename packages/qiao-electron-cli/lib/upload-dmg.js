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

  // cos config
  const cosConfig = config.cosConfig;
  const client = q(cosConfig);

  // rs
  const rs = await client.uploadFile(destPath, dmgPath);
  if (!rs || !rs.Location) return;

  // return
  return `https://${rs.Location}`;
};
