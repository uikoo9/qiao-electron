// path
import path from 'path';

// download
import { download } from 'qiao-downloader';

// unzip
import { unzip, rm } from 'qiao-zip';

// file
import { readFile, writeFile } from 'qiao-file';

// logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-x-update');

/**
 * updateApp
 * @param {*} downloadUrl
 * @param {*} appPath
 * @param {*} version
 * @returns
 */
export const updateApp = async (downloadUrl, appPath, version) => {
  const methodName = 'updateApp';

  // download zip
  const downloadDest = path.resolve(appPath, `./Contents/Reources/app/${version}.zip`);
  const downloadRes = await download(downloadUrl, downloadDest);
  logger.info(methodName, 'downloadUrl', downloadUrl);
  logger.info(methodName, 'downloadDest', downloadDest);
  logger.info(methodName, 'downloadRes', downloadRes);
  if (!downloadRes) return;

  // unzip
  const zipDest = path.resolve(appPath, `./Contents/Reources/app/${version}.asar`);
  const zipRes = await unzip(downloadDest, zipDest);
  logger.info(methodName, 'zipDest', zipDest);
  logger.info(methodName, 'zipRes', zipRes);
  if (!downloadRes) return;

  // rewrite json
  try {
    const jsonPath = path.resolve(appPath, './Contents/Reources/app/package.json');
    const jsonStr = await readFile(jsonPath);
    const json = JSON.parse(jsonStr);
    json.version = version;
    json.main = `${version}.asar/main/index.js`;
    logger.info(methodName, 'jsonPath', jsonPath);
    logger.info(methodName, 'json', json);

    const rewriteRes = await writeFile(jsonPath, JSON.stringify(json));
    logger.info(methodName, 'rewriteRes', rewriteRes);
    if (!rewriteRes) return;
  } catch (error) {
    logger.error(methodName, 'rewriteError', error);
    return;
  }

  // rm
  const rmRes = await rm(downloadDest);
  logger.info(methodName, 'rmRes', rmRes);
  return true;
};
