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
  // cos config
  const cosConfig = config.cosConfig;
  const client = q(cosConfig);

  // dest path
  const dmgName = `${config.appName}-${config.appEnv}-${config.appVersion}-${config.arch}`;
  const dmgPath = path.resolve(process.cwd(), `${config.outPath}/dmg/${dmgName}.dmg`);
  const destPath = `${cosConfig.destPath}${dmgName}.dmg`;

  // rs
  const rs = await client.uploadFile(destPath, dmgPath);
  if (!rs || !rs.Location) return;

  // return
  return `https://${rs.Location}`;
};
