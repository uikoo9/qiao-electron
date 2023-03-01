'use strict';

// electron zip
const zip = require('electron-installer-zip');

// checker
const checker = require('./_check.js');

/**
 * zip
 * @param {*} config
 * @returns
 */
module.exports = async function (config) {
  // check
  checker.checkConfig(config);

  // opts
  let zipOptions = [];
  const opts = getZipOptions(config);
  if (!Array.isArray(opts)) {
    zipOptions.push(opts);
  } else {
    zipOptions = [].concat(opts);
  }
  console.log('zip options:', zipOptions);

  // all promise
  const allPromiseArray = zipOptions.map(function (item) {
    // zip
    return new Promise(function (resolve, reject) {
      zip(item, function (err, res) {
        return err ? reject(err) : resolve(res);
      });
    });
  });

  //
  Promise.all(allPromiseArray);
};

// get zip options
function getZipOptions(config) {
  const isArchArray = Array.isArray(config.arch);

  // string
  if (!isArchArray) {
    return {
      out: `${config.outPath}/${config.appName}-${config.appVersion}-${process.platform}-${config.arch}.zip`,
      dir: getDirPath(config, config.arch),
    };
  }

  // arrag
  if (isArchArray) {
    return config.arch.map(function (item) {
      return {
        out: `${config.outPath}/${config.appName}-${config.appVersion}-${process.platform}-${item}.zip`,
        dir: getDirPath(config, item),
      };
    });
  }
}

// get dir path
function getDirPath(config, arch) {
  let dirPath;
  if (process.platform === 'win32') dirPath = `${config.outPath}/${config.appName}-${process.platform}-${arch}`;
  if (process.platform === 'darwin')
    dirPath = `${config.outPath}/${config.appName}-${process.platform}-${arch}/${config.appName}.app`;

  return dirPath;
}
