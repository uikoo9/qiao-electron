// path
import path from 'path';

// colors
import { colors } from 'qiao-cli';

// file
import { isExists, mkdir } from 'qiao-file';

/**
 * tmp dir
 * @param {*} pngPath
 * @returns
 */
export const tmpDir = async (pngPath) => {
  const tmpDirName = path.resolve(path.dirname(pngPath), './tmp.iconset');
  if (!(await isExists(tmpDirName))) {
    const res = await mkdir(tmpDirName);
    if (!res) {
      console.log(colors.red(`electron-icns / tmpdir / failed: ${tmpDirName}`));
      return false;
    } else {
      console.log('electron-icns / tmpdir / success');
    }
  }

  return tmpDirName;
};
