// path
import path from 'path';

// colors
import { colors } from 'qiao-cli';

// rm
import { rmTmpDir } from './tmp-dir.js';

// run cmd
import { runCmd } from './run-cmd.js';

/**
 * iconutil
 * @param {*} options
 * @param {*} tmpDirName
 * @returns
 */
export const iconutil = async (options, tmpDirName) => {
  const cmd = 'iconutil -c icns tmp.iconset -o icon.icns';
  const res = await runCmd(cmd, options);

  // fail
  if (!res) {
    await rmTmpDir(tmpDirName);
    console.log(colors.red('electron-icns / iconutil / failed'));

    return;
  }

  // success
  console.log('electron-icns / iconutil / success');
  await rmTmpDir(tmpDirName);

  const icnsPath = path.resolve(options.cwd, './icon.icns');
  console.log(colors.green(`electron-icns / success ${icnsPath}`));
  console.log();

  return icnsPath;
};
