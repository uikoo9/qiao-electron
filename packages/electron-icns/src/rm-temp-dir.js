// file
import { rm } from 'qiao-file';

// colors
import { colors } from 'qiao-cli';

/**
 * rmTempDir
 * @param {*} tmpDirName
 * @returns
 */
export const rmTempDir = async (tmpDirName) => {
  if (!tmpDirName) return;

  const res = await rm(tmpDirName);
  if (!res) {
    console.log(colors.red('electron-icns / rmTempDir / failed'));
    return;
  }

  console.log('electron-icns / rmTempDir / success');
};
