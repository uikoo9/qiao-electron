'use strict';

var path = require('path');
var qiaoDownloader = require('qiao-downloader');
var qiaoZip = require('qiao-zip');
var qiaoFile = require('qiao-file');
var qiao_log_js = require('qiao.log.js');

// path
const logger = qiao_log_js.Logger('qiao-x-update');

/**
 * updateApp
 * @param {*} downloadUrl
 * @param {*} appPath
 * @param {*} appVersion
 * @returns
 */
const updateApp = async (downloadUrl, appPath, appVersion) => {
  const methodName = 'updateApp';

  // root
  const root = appPath;
  logger.info(methodName, 'root', root);

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

exports.updateApp = updateApp;
