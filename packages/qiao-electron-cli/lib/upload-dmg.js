'use strict';

// path
const path = require('path');

// q
const q = require('qiao-cos');

// checker
const checker = require('./_check.js');

/**
 * upload dmg
 * @param {*} config
 * @returns
 */
module.exports = async function (config) {
  // check
  checker.checkConfig(config);
  checker.checkCosConfig(config);

  // cos config
  const cosConfig = config.cosConfig;
  const client = q(cosConfig);

  // dest path
  const dmgName = `${config.appName}-${config.appEnv}-${config.appVersion}-${config.arch}`;
  const dmgPath = path.resolve(process.cwd(), `${config.outPath}/dmg/${dmgName}.dmg`);
  const destPath = `${cosConfig.destPath}${dmgName}.dmg`;

  // rs
  const rs = await client.uploadFileSync(destPath, dmgPath);
  if (!rs || !rs.Location) return;

  // return
  return `https://${rs.Location}`;
};
