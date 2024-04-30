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
 * @param {*} version
 * @returns
 */
const updateApp = async (downloadUrl, appPath, version) => {
  const methodName = 'updateApp';

  // download zip
  const downloadDest = path.resolve(appPath, `./Contents/Reources/app/${version}.zip`);
  const downloadRes = await qiaoDownloader.download(downloadUrl, downloadDest);
  logger.info(methodName, 'downloadUrl', downloadUrl);
  logger.info(methodName, 'downloadDest', downloadDest);
  logger.info(methodName, 'downloadRes', downloadRes);
  if (!downloadRes) return;

  // unzip
  const zipDest = path.resolve(appPath, `./Contents/Reources/app/${version}.asar`);
  const zipRes = await qiaoZip.unzip(downloadDest, zipDest);
  logger.info(methodName, 'zipDest', zipDest);
  logger.info(methodName, 'zipRes', zipRes);
  if (!downloadRes) return;

  // rewrite json
  try {
    const jsonPath = path.resolve(appPath, './Contents/Reources/app/package.json');
    const jsonStr = await qiaoFile.readFile(jsonPath);
    const json = JSON.parse(jsonStr);
    json.version = version;
    json.main = `${version}.asar/main/index.js`;
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
  const rmRes = await qiaoZip.rm(downloadDest);
  logger.info(methodName, 'rmRes', rmRes);
  return true;
};

exports.updateApp = updateApp;