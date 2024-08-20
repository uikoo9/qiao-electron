// path
const path = require('path');

// msi
const { MSICreator } = require('electron-wix-msi');

// logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-electron-cli');

/**
 * pack win
 * @param {*} config
 * @returns
 */
module.exports = async function (config) {
  // vars
  const arch = config.arch;
  const outPath = config.out;
  const appName = config.name;
  const appVersion = config.appVersion;
  const appCopyright = config.appCopyright;

  // other vars
  const root = process.cwd();
  const appPath = path.resolve(root, `${outPath}/${appName}-win32-${arch}`);
  const outputPath = path.resolve(root, outPath);

  // options
  const options = {
    appDirectory: appPath,
    description: appName,
    exe: appName,
    name: appName,
    manufacturer: appCopyright,
    version: appVersion,
    outputDirectory: outputPath,
  };

  // log
  logger.info('pack-win.js', 'pack electron application for windows installer by qiao-electron-cli:');
  logger.info('pack-win.js', 'options', options);
  console.log();

  // creator
  const msiCreator = new MSICreator(options);

  // create
  await msiCreator.create();
  // supportBinaries.forEach(async (binary) => {
  //   await signFile(binary);
  // });

  // compile
  await msiCreator.compile();
};
