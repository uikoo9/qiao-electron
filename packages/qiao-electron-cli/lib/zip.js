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
  const opts = {
    dir: `${config.outPath}/${config.appName}-darwin-${config.arch}/${config.appName}.app`,
    out: `${config.outPath}/`,
  };

  // zip
  zip(opts, function (err, res) {
    if (err) {
      console.log('zip file errored:');
      console.error(err);

      return;
    }

    console.log(`zip file success: ${res}`);
  });
};
