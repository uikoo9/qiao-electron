// path
const path = require('path');

// appdmg
const appDMG = require('./appdmg.js');

/**
 * pack dmg
 * @param {*} config
 * @returns
 */
module.exports = async function (config) {
  console.log('pack electron application for mac dmg by qiao-electron-cli:');
  console.log(config);
  console.log();

  // vars
  const outPath = config.out;
  const arch = config.arch;
  const appName = config.name;
  const appVersion = config.appVersion;
  const appIcon = config.icon;
  const dmgIconSize = config.dmgIconSize;
  const dmgBackground = config.dmgBackground;

  // other vars
  const root = process.cwd();
  const appPath = path.resolve(root, `${outPath}/${appName}-darwin-${arch}/${appName}.app`);
  const dmgName = `${appName}-${appVersion}-${arch}`;
  const dmgOutPath = path.resolve(root, `${outPath}/dmg`);

  // options
  const options = {
    name: dmgName,
    icon: appIcon,

    overwrite: true,
    debug: false,

    appPath: appPath,
    iconSize: dmgIconSize || 80,
    background: dmgBackground,

    out: dmgOutPath,
  };

  // dmg
  return await appDMG(options);
};
