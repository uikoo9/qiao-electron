// path
import path from 'path';

// cp
import { exec } from 'child_process';

// colors
import { colors, progress } from 'qiao-cli';

// file
import { isExists, mkdir, rm } from 'qiao-file';

// tmp dir
let tmpDirName;

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
  const tempRes = await tmpDir(pngPath);
  if (!tempRes) return;

  // sips
  sips(pngPath);
};

// tmp dir
async function tmpDir(pngPath) {
  tmpDirName = path.resolve(path.dirname(pngPath), './tmp.iconset');
  if (!(await isExists(tmpDirName))) {
    const res = await mkdir(tmpDirName);
    if (!res) {
      console.log(colors.red(`electron-icns / tmpdir / failed: ${tmpDirName}`));
      return false;
    } else {
      console.log('electron-icns / tmpdir / success');
    }
  }

  return true;
}

// sips
function sips(pngPath) {
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

  for (let i = 0; i < cmds.length; i++) {
    const cmd = cmds[i];
    exec(cmd, options, async (error) => {
      if (error) {
        console.log(colors.red('electron-icns / sips / failed'));
        await deleteTmpDir();
        return;
      }

      bar.tick();

      // icns
      if (bar.complete) {
        iconutil(options);
      }
    });
  }
}

// iconutil
function iconutil(options) {
  const cmd = 'iconutil -c icns tmp.iconset -o icon.icns';
  exec(cmd, options, async (error) => {
    // log
    if (error) {
      await deleteTmpDir();
      console.log(colors.red('electron-icns / iconutil / failed'));
    } else {
      console.log('electron-icns / iconutil / success');
      await deleteTmpDir();

      const icnsPath = path.resolve(options.cwd, './icon.icns');
      console.log(colors.green(`electron-icns / success ${icnsPath}`));
    }
  });
}

// delete tmp dir
async function deleteTmpDir() {
  if (!tmpDirName) return;

  await rm(tmpDirName);
  console.log('electron-icns / delete tmp.iconset / success');
}