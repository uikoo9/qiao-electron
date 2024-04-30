// electron zip
const zip = require('electron-installer-zip');

// logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-electron-cli');

/**
 * zip
 * @param {*} config
 * @returns
 */
module.exports = async function (config) {
  const methodName = 'zip.js';

  // opts
  let zipOptions = [];
  const opts = getZipOptions(config);
  if (!Array.isArray(opts)) {
    zipOptions.push(opts);
  } else {
    zipOptions = [].concat(opts);
  }
  logger.info(methodName, 'zipOptions', zipOptions);

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
