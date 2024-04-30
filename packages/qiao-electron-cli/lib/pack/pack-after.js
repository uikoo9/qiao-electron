// path
const path = require('path');

// file
const { readFile, writeFile, rm } = require('qiao-file');

// logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-electron-cli');

/**
 * afterPack
 * @returns
 */
exports.afterPack = async function (buildPath) {
  const methodName = 'afterPack';
  logger.info(methodName, 'buildPath', buildPath);

  // version
  let version;

  // json
  try {
    const jsonSrc = path.resolve(buildPath, `./package.json`);
    const jsonStr = await readFile(jsonSrc);
    logger.info(methodName, 'jsonSrc', jsonSrc);
    logger.info(methodName, 'jsonStr', jsonStr);
    if (!jsonStr) return;

    const json = JSON.parse(jsonStr);
    version = json.version;
    json.main = `${version}.asar/main/index.js`;
    const jsonAfterStr = JSON.stringify(json);
    const jsonRes = await writeFile(jsonSrc, jsonAfterStr);
    logger.info(methodName, 'jsonVersion', version);
    logger.info(methodName, 'jsonAfterStr', jsonAfterStr);
    logger.info(methodName, 'jsonRes', jsonRes);
    if (!jsonRes) return;
  } catch (error) {
    logger.info(methodName, 'json', 'error', error);
    return;
  }

  // rm
  const rmPath = path.resolve(buildPath, `./${version}`);
  const rmRes = await rm(rmPath);
  logger.info(methodName, 'rmPath', rmPath);
  logger.info(methodName, 'rmRes', rmRes);
};
