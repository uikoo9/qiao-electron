'use strict';

var path = require('path');
var qiaoDownloader = require('qiao-downloader');
var qiaoZip = require('qiao-zip');
var qiaoFile = require('qiao-file');
var qiao_log_js = require('qiao.log.js');
var qiaoXLogger = require('qiao-x-logger');

// path
const consoleLogger = qiao_log_js.Logger('qiao-x-update');
const localLogger = qiaoXLogger.Logger('qiao-x-update');

/**
 * updateApp
 * @param {*} downloadUrl
 * @param {*} appPath
 * @param {*} appVersion
 * @param {*} showLog
 * @returns
 */
const updateApp = async (downloadUrl, appPath, appVersion, useLocalLogger) => {
  const methodName = 'updateApp';
  const logger = useLocalLogger ? localLogger : consoleLogger;

  // root
  const winAppPath = path.resolve(process.cwd(), './resources/app');
  const root = process.platform === 'darwin' ? appPath : winAppPath;
  logger.info(methodName, 'root', root);

  // check version
  try {
    const jsonPath = path.resolve(root, './package.json');
    const jsonStr = await qiaoFile.readFile(jsonPath);
    const json = JSON.parse(jsonStr);
    const checkVersionRes = compareVersion(appVersion, json.version);
    logger.info(methodName, 'checkVersionRes', checkVersionRes);
    if (checkVersionRes !== 1) return;
  } catch (error) {
    logger.error(methodName, 'checkVersionError', error);
    return;
  }

  // download zip
  const downloadPath = await qiaoFile.tmpdir();
  const downloadDest = path.resolve(downloadPath, `./${appVersion}.zip`);
  const downloadRes = await qiaoDownloader.download(downloadUrl, downloadDest);
  logger.info(methodName, 'downloadUrl', downloadUrl);
  logger.info(methodName, 'downloadPath', downloadPath);
  logger.info(methodName, 'downloadDest', downloadDest);
  logger.info(methodName, 'downloadRes', downloadRes);
  if (!downloadRes) return;

  // unzip
  process.noAsar = true;
  const zipRes = await qiaoZip.unzip(downloadDest, root);
  process.noAsar = false;
  logger.info(methodName, 'zipRes', zipRes);
  if (!downloadRes) return;

  // rewrite json
  try {
    const jsonPath = path.resolve(root, './package.json');
    const jsonStr = await qiaoFile.readFile(jsonPath);
    const json = JSON.parse(jsonStr);
    json.version = appVersion;
    json.main = `${appVersion}.asar/main/index.js`;
    logger.info(methodName, 'jsonPath', jsonPath);
    logger.info(methodName, 'json', json);

    const rewriteRes = await qiaoFile.writeFile(jsonPath, JSON.stringify(json));
    logger.info(methodName, 'rewriteRes', rewriteRes);
    if (!rewriteRes) return;
  } catch (error) {
    logger.error(methodName, 'rewriteError', error);
    return;
  }

  // rm
  const rmRes = await qiaoFile.rm(downloadDest);
  logger.info(methodName, 'rmRes', rmRes);
  return true;
};

function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10);
    const num2 = parseInt(v2[i], 10);

    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

exports.updateApp = updateApp;
