'use strict';

// colors
const { colors, progress } = require('qiao-cli');

// path
const { dirname, resolve } = require('path');

// file
const { isExists, mkdir, rm } = require('qiao-file');

// cp
const { exec } = require('child_process');

// tmp dir
let tmpDirName;

/**
 * icon
 */
module.exports = function (iconPath) {
  // check
  if (!iconPath) {
    console.log(colors.red('qiao-electron-cli, icns, failed: need icon path'));
    return;
  }

  // tmp.iconset
  const tempRes = tmpDir(iconPath);
  if (!tempRes) return;

  // options
  const options = {
    cwd: dirname(iconPath),
  };

  // sips
  sips(options);
};

// tmp dir
function tmpDir(iconPath) {
  tmpDirName = resolve(dirname(iconPath), './tmp.iconset');
  if (!isExists(tmpDirName)) {
    const res = mkdir(`${tmpDirName}/`);
    if (!res) {
      console.log(colors.red(`qiao-electron-cli, icns, tmpdir failed: ${tmpDirName}`));
      return false;
    } else {
      console.log('qiao-electron-cli, icns, tmpdir success');
    }
  }

  return true;
}

// sips
function sips(options) {
  // cmds
  const cmds = [
    'sips -z 16 16      pic.png --out tmp.iconset/icon_16x16.png',
    'sips -z 32 32      pic.png --out tmp.iconset/icon_16x16@2x.png',
    'sips -z 32 32      pic.png --out tmp.iconset/icon_32x32.png',
    'sips -z 64 64      pic.png --out tmp.iconset/icon_32x32@2x.png',
    'sips -z 128 128    pic.png --out tmp.iconset/icon_128x128.png',
    'sips -z 256 256    pic.png --out tmp.iconset/icon_128x128@2x.png',
    'sips -z 256 256    pic.png --out tmp.iconset/icon_256x256.png',
    'sips -z 512 512    pic.png --out tmp.iconset/icon_256x256@2x.png',
    'sips -z 512 512    pic.png --out tmp.iconset/icon_512x512.png',
    'sips -z 1024 1024  pic.png --out tmp.iconset/icon_512x512@2x.png',
  ];

  // bar
  const bar = new progress('qiao-electron-cli, icns, sips... :current/:total', {
    total: cmds.length,
  });

  for (let i = 0; i < cmds.length; i++) {
    const cmd = cmds[i];
    exec(cmd, options, function () {
      bar.tick();

      // icns
      if (bar.complete) {
        icns(options);
      }
    });
  }
}

// icns
function icns(options) {
  const cmd = 'iconutil -c icns tmp.iconset -o icon.icns';
  exec(cmd, options, function (error) {
    if (error) {
      console.log(colors.red('qiao-electron-cli, icns, iconutil: failed'));
    } else {
      console.log('qiao-electron-cli, icns, iconutil success');
      deleteTmpDir();
    }
  });
}

// delete tmp dir
function deleteTmpDir() {
  if (tmpDirName) {
    rm(`${tmpDirName}/`);
    console.log('qiao-electron-cli, icns, delete tmp.iconset success');
  }

  console.log(colors.green('qiao-electron-cli, icns: success'));
}
