// path
const path = require('path');

// qiao
const cli = require('qiao-cli');
const { icns } = require('../index.js');

/**
 * icns icon
 * @param {*} configPath
 * @param {*} filePath
 * @param {*} bucketPath
 */
const icnsIcon = async (pngPath) => {
  try {
    const cwd = process.cwd();
    if (!path.isAbsolute(pngPath)) pngPath = path.resolve(cwd, pngPath);

    await icns(pngPath);
  } catch (e) {
    console.log('electron-icns / error');
    console.log();

    console.log(e);
  }
};

// cmd for icon
cli.cmd.command('icon <pngPath>').alias('i').description('generate electron icns icon').action(icnsIcon);
