// colors
import { colors } from 'qiao-cli';

// file
import { isExists, mkdir, rm, path } from 'qiao-file';

/**
 * mkTmpDir
 * @param {*} pngPath
 * @returns
 */
export const mkTmpDir = async (pngPath) => {
  const tmpDirName = path.resolve(path.dirname(pngPath), './tmp.iconset');
  if (!(await isExists(tmpDirName))) {
    const res = await mkdir(tmpDirName);
    if (!res) {
      console.log(colors.red(`electron-icns / mkTmpDir / failed: ${tmpDirName}`));
      return false;
    } else {
      console.log('electron-icns / mkTmpDir / success');
    }
  }

  return tmpDirName;
};

/**
 * rmTmpDir
 * @param {*} dir
 * @returns
 */
export const rmTmpDir = async (dir) => {
  if (!dir) return;

  const res = await rm(dir);
  if (!res) {
    console.log(colors.red('electron-icns / rmTmpDir / failed'));
    return;
  }

  console.log('electron-icns / rmTmpDir / success');
};
