// path
const path = require('path');

// file
const { cp, readFile, writeFile, rm, mv } = require('qiao-file');

// asar
const asar = require('@electron/asar');

// zip
const { zip } = require('qiao-zip');

// logger
const { Logger } = require('qiao.log.js');
const logger = Logger('qiao-electron-cli');

/**
 * versionUpdate
 * @param {*} config
 * @returns
 */
exports.versionUpdate = async function (config) {
  const methodName = 'versionUpdate';

  // root
  const root = process.cwd();
  const version = config.appVersion;
  const postPath = `${config.dir}-post`;
  logger.info(methodName, 'root', root);
  logger.info(methodName, 'version', version);
  logger.info(methodName, 'postPath', postPath);

  // cp
  const cpSrc = path.resolve(root, config.dir);
  const cpDest = path.resolve(root, `${postPath}/${version}`);
  const cpRes = await cp(cpSrc, cpDest);
  logger.info(methodName, 'cpSrc', cpSrc);
  logger.info(methodName, 'cpDest', cpDest);
  logger.info(methodName, 'cpRes', cpRes);
  if (!cpRes) return;

  // asar
  const asarDest = path.resolve(root, `${postPath}/${version}.asar`);
  logger.info(methodName, 'asarDest', asarDest);
  try {
    await asar.createPackageWithOptions(cpDest, asarDest, {});
    logger.info(methodName, 'asarRes', 'sucess');
  } catch (error) {
    logger.error(methodName, 'asarRes', 'error', error);
    return;
  }

  // json
  try {
    const jsonSrc = path.resolve(root, `${postPath}/${version}/package.json`);
    const jsonDest = path.resolve(root, `${postPath}/package.json`);
    const jsonStr = await readFile(jsonSrc);
    logger.info(methodName, 'jsonSrc', jsonSrc);
    logger.info(methodName, 'jsonDest', jsonDest);
    logger.info(methodName, 'jsonStr', jsonStr);
    if (!jsonStr) return;

    const json = JSON.parse(jsonStr);
    json.main = `${version}/main/index.js`;
    const jsonRes = await writeFile(jsonDest, JSON.stringify(json));
    logger.info(methodName, 'jsonRes', jsonRes);
    if (!jsonRes) return;
  } catch (error) {
    logger.error(methodName, 'json', 'error', error);
    return;
  }

  // zip
  const zipDest = path.resolve(root, `${config.out}/update/${config.name}-${config.platform}-${version}.zip`);
  const zipRes = await zip(asarDest, zipDest);
  logger.info(methodName, 'zipSrc', asarDest);
  logger.info(methodName, 'zipDest', zipDest);
  logger.info(methodName, 'zipRes', zipRes);
  if (!zipRes) return;

  // rm
  const rmRes = await rm(cpSrc);
  logger.info(methodName, 'rmRes', rmRes);
  if (!rmRes) return;

  // mv
  const oldPath = path.resolve(root, postPath);
  const mvRes = await mv(oldPath, cpSrc);
  logger.info(methodName, 'mvRes', mvRes);
  if (!mvRes) return;

  // return
  return true;
};
