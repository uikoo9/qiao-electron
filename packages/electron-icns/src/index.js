// colors
import { colors } from 'qiao-cli';

// file
import { isExists } from 'qiao-file';

// tmp dir
import { mkTmpDir } from './tmp-dir.js';

// sips
import { sips } from './sips.js';

// iconutil
import { iconutil } from './iconutil.js';

/**
 * icon
 */
export const icns = async (pngPath) => {
  // darwin
  if (process.platform !== 'darwin') {
    console.log(colors.red('electron-icns / failed: only support on macos'));
    return;
  }

  // check
  if (!pngPath) {
    console.log(colors.red('electron-icns / failed: need png path'));
    return;
  }
  if (!(await isExists(pngPath))) {
    console.log(colors.red('electron-icns / failed: png not exists'));
    return;
  }

  // log
  console.log('electron-icns / from', pngPath);

  // tmp.iconset
  const tmpDirName = await mkTmpDir(pngPath);
  if (!tmpDirName) return;

  // sips
  const options = await sips(pngPath, tmpDirName);
  if (!options) return;

  // iconutil
  const icnsPath = await iconutil(options, tmpDirName);
  return icnsPath;
};
