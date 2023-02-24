'use strict';

// electron pakcager
const packager = require('electron-packager');
const { serialHooks } = require('electron-packager/src/hooks');

// checker
const checker = require('./_check.js');

// util
const util = require('./_util.js');

/**
 * pack
 * @param {*} config
 * @returns
 */
module.exports = async function (config) {
  // check
  checker.checkConfig(config);

  // options
  const options = {
    overwrite: true,
    dir: config.distPath,
    out: config.outPath,
    arch: config.arch,
    asar: config.asar,
    name: config.appName,
    icon: util.getIcon(config.appIconPath),
    appVersion: config.appVersion,
    appCopyright: config.appCopyright,
    osxSign: config.osxSign,
  };

  // universal
  if (config.arch === 'universal') {
    options.osxUniversal = {
      x64AppPath: `${config.outPath}/${config.appName}-darwin-x64/${config.appName}.app`,
      arm64AppPath: `${config.outPath}/${config.appName}-darwin-arm64/${config.appName}.app`,
      outAppPath: `${config.outPath}/${config.appName}-darwin-universal/${config.appName}.app`,
    };

    if (config.universalOptions) options.osxUniversal.x64ArchFiles = config.universalOptions;
  }

  // hooks
  if (config.afterInitialize) {
    options.afterInitialize = [serialHooks([config.afterInitialize])];
  }

  // packager
  return await packager(options);
};
