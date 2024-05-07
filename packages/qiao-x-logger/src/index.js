// path
import path from 'path';

// download
import { download } from 'qiao-downloader';

// unzip
import { unzip } from 'qiao-zip';

// file
import { tmpdir, readFile, writeFile, rm } from 'qiao-file';

// logger
import { Logger } from 'qiao.log.js';
const logger = Logger('qiao-x-logger');

/**
 * updateApp
 * @param {*} downloadUrl
 * @param {*} appPath
 * @param {*} appVersion
 * @returns
 */
export const updateApp = async (downloadUrl, appPath, appVersion) => {
  const methodName = 'updateApp';

  // root
  const root = appPath;
  logger.info(methodName, 'root', root);

  // download zip
  const downloadPath = await tmpdir();
  const downloadDest = path.resolve(downloadPath, `./${appVersion}.zip`);
  const downloadRes = await download(downloadUrl, downloadDest);
  logger.info(methodName, 'downloadUrl', downloadUrl);
  logger.info(methodName, 'downloadPath', downloadPath);
  logger.info(methodName, 'downloadDest', downloadDest);
  logger.info(methodName, 'downloadRes', downloadRes);
  if (!downloadRes) return;

  // unzip
  process.noAsar = true;
  const zipRes = await unzip(downloadDest, root);
  process.noAsar = false;
  logger.info(methodName, 'zipRes', zipRes);
  if (!downloadRes) return;

  // rewrite json
  try {
    const jsonPath = path.resolve(root, './package.json');
    const jsonStr = await readFile(jsonPath);
    const json = JSON.parse(jsonStr);
    json.version = appVersion;
    json.main = `${appVersion}.asar/main/index.js`;
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
