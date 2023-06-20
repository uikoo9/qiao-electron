'use strict';

/**
 * check config
 * @param {*} config
 */
exports.checkConfig = function (config) {
  // check config
  if (!config) throw new Error('need config params');

  // vars
  const srcPath = config.srcPath;
  const distPath = config.distPath;
  const outPath = config.outPath;

  const arch = config.arch;

  const appEnv = config.appEnv;
  const appName = config.appName;
  const appVersion = config.appVersion;
  const appCopyright = config.appCopyright;

  // check paths
  if (!srcPath) throw new Error('need config.srcPath params');
  if (!distPath) throw new Error('need config.distPath params');
  if (!outPath) throw new Error('need config.outPath params');

  // others
  if (!appEnv) throw new Error('need config.appEnv params');
  if (!appName) throw new Error('need config.appName params');
  if (!appVersion) throw new Error('need config.appVersion params');
  if (!appCopyright) throw new Error('need config.appCopyright params');

  // arch
  if (!arch) throw new Error('need config.arch params');
};

/**
 * check cos config
 * @param {*} config
 */
exports.checkCosConfig = function (config) {
  // check config
  if (!config || !config.cosConfig) throw new Error('need config.cosConfig params');

  // cos config
  const cosConfig = config.cosConfig;
  if (!cosConfig.SecretId) throw new Error('need config.cosConfig.SecretId params');
  if (!cosConfig.SecretKey) throw new Error('need config.cosConfig.SecretKey params');
  if (!cosConfig.Region) throw new Error('need config.cosConfig.Region params');
  if (!cosConfig.Bucket) throw new Error('need config.cosConfig.Bucket params');
  if (!cosConfig.destPath) throw new Error('need config.cosConfig.destPath params');
};
