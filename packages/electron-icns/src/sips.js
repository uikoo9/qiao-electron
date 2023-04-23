// path
import path from 'path';

// colors
import { colors, progress } from 'qiao-cli';

// rm
import { rmTmpDir } from './tmp-dir.js';

// run cmd
import { runCmd } from './run-cmd.js';

/**
 * sips
 * @param {*} pngPath
 * @param {*} tmpDirName
 */
export const sips = async (pngPath, tmpDirName) => {
  //
  const pngName = path.basename(pngPath);
  const dirName = path.dirname(pngPath);
  const options = {
    cwd: dirName,
  };

  // cmds
  const cmds = [
    `sips -z 16 16      ${pngName} --out tmp.iconset/icon_16x16.png`,
    `sips -z 32 32      ${pngName} --out tmp.iconset/icon_16x16@2x.png`,
    `sips -z 32 32      ${pngName} --out tmp.iconset/icon_32x32.png`,
    `sips -z 64 64      ${pngName} --out tmp.iconset/icon_32x32@2x.png`,
    `sips -z 128 128    ${pngName} --out tmp.iconset/icon_128x128.png`,
    `sips -z 256 256    ${pngName} --out tmp.iconset/icon_128x128@2x.png`,
    `sips -z 256 256    ${pngName} --out tmp.iconset/icon_256x256.png`,
    `sips -z 512 512    ${pngName} --out tmp.iconset/icon_256x256@2x.png`,
    `sips -z 512 512    ${pngName} --out tmp.iconset/icon_512x512.png`,
    `sips -z 1024 1024  ${pngName} --out tmp.iconset/icon_512x512@2x.png`,
  ];

  // bar
  const bar = new progress('electron-icns / sips... :current/:total', {
    total: cmds.length,
  });

  // run
  for (let i = 0; i < cmds.length; i++) {
    // cmd
    const res = await runCmd(cmds[i], options);
    if (!res) {
      console.log();
      console.log(colors.red('electron-icns / sips / failed'));
      await rmTmpDir(tmpDirName);
      return;
    }

    // run
    bar.tick();
    if (bar.complete) return options;
  }
};
