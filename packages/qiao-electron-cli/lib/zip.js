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
  return new Promise((resolve, reject) => {
    // check
    checker.checkConfig(config);

    // opts
    const opts = {
      dir: `${config.outPath}/${config.appName}-${process.platform}-${config.arch}/${config.appName}.app`,
      out: `${config.outPath}/${config.appName}-${process.platform}-${config.arch}/${config.appName}-${config.appVersion}.zip`,
    };

    // zip
    zip(opts, function (err, res) {
      return err ? reject(err) : resolve(res);
    });
  });
};
