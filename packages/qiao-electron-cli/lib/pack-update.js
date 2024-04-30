// path
const path = require('path');

// file
const { cp, readFile, writeFile } = require('qiao-file');

// version
const { version } = require('../../dist/package.json');

// asar
const asar = require('@electron/asar');

// logger
const { Logger } = require('qiao.log.js');
const logger = Logger('pack-asar.js');

// asar
exports.asar = async function () {
  const methodName = 'asar';

  // cp
  const cpSrc = path.resolve(__dirname, '../../dist');
  const cpDest = path.resolve(__dirname, `../../dist-post/${version}`);
  const cpRes = await cp(cpSrc, cpDest);
  logger.info(methodName, 'cpSrc', cpSrc);
  logger.info(methodName, 'cpDest', cpDest);
  logger.info(methodName, 'cpRes', cpRes);
  if (!cpRes) return;

  // asar
  const asarDest = path.resolve(__dirname, `../../dist-post/${version}.asar`);
  logger.info(methodName, 'asarDest', asarDest);
  try {
    await asar.createPackageWithOptions(cpDest, asarDest, {});
    logger.info(methodName, 'asarRes', 'sucess');
  } catch (error) {
    logger.info(methodName, 'asarRes', 'error', error);
    return;
  }

  // json
  try {
    const jsonSrc = path.resolve(__dirname, `../../dist-post/${version}/package.json`);
    const jsonDest = path.resolve(__dirname, `../../dist-post/package.json`);
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
    logger.info(methodName, 'json', 'error', error);
  }
};
