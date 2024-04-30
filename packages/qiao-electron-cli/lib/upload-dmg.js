// path
const path = require('path');

// q
const q = require('qiao-cos');

// logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-electron-cli');

/**
 * upload dmg
 * @param {*} config
 * @returns
 */
module.exports = async function (config) {
  logger.info('upload-dmg.js', 'upload mac dmg by qiao-electron-cli:');
  logger.info('upload-dmg.js', 'config', config);
  console.log();

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
