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
  // vars
  const outPath = config.out;
  const arch = config.arch;
  const appName = config.name;
  const appVersion = config.appVersion;
  const appIcon = config.icon;

  // other vars
  const root = process.cwd();
  const appPath = path.resolve(root, `${outPath}/${appName}-darwin-${arch}/${appName}.app`);
  const dmgName = `${appName}-${appVersion}-${arch}`;
  const dmgOutPath = path.resolve(root, `${outPath}/dmg`);
  const dmgIconSize = config.dmgIconSize;
  const dmgBackground = config.background;
  const dmgWindow = config.window;

  // dmg contents
  let dmgContents = config.contents;
  if (dmgContents) {
    for (let i = 0; i < dmgContents.length; i++) {
      const item = dmgContents[i];
      if (item && item.type === 'file') item.path = appPath;
      if (item && item.type === 'link') item.path = '/Applications';
    }
  }

  // options
  const options = {
    name: dmgName,
    icon: appIcon,

    overwrite: true,
    debug: false,

    appPath: appPath,
    iconSize: dmgIconSize || 80,
    background: dmgBackground,
    contents: dmgContents,

    out: dmgOutPath,
  };
  if (dmgWindow) options.additionalDMGOptions = { window: dmgWindow };

  // log
  console.log('pack electron application for mac dmg by qiao-electron-cli:');
  console.log(options);
  console.log();

  // dmg
  return await appDMG(options);
};
