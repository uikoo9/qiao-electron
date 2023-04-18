'use strict';

var qiaoCli = require('qiao-cli');
var qiaoFile = require('qiao-file');
var path = require('path');
var child_process = require('child_process');

// path

/**
 * tmp dir
 * @param {*} pngPath
 * @returns
 */
const tmpDir = async (pngPath) => {
  const tmpDirName = path.resolve(path.dirname(pngPath), './tmp.iconset');
  if (!(await qiaoFile.isExists(tmpDirName))) {
    const res = await qiaoFile.mkdir(tmpDirName);
    if (!res) {
      console.log(qiaoCli.colors.red(`electron-icns / tmpdir / failed: ${tmpDirName}`));
      return false;
    } else {
      console.log('electron-icns / tmpdir / success');
    }
  }

  return tmpDirName;
};

// file

/**
 * rmTempDir
 * @param {*} tmpDirName
 * @returns
 */
const rmTempDir = async (tmpDirName) => {
  if (!tmpDirName) return;

  const res = await qiaoFile.rm(tmpDirName);
  if (!res) {
    console.log(qiaoCli.colors.red('electron-icns / rmTempDir / failed'));
    return;
  }

  console.log('electron-icns / rmTempDir / success');
};

// cp

/**
 * run cmd
 * @param {*} cmd
 * @param {*} options
 * @returns
 */
const runCmd = (cmd, options) => {
  return new Promise((resolve) => {
    child_process.exec(cmd, options, (error) => {
      return resolve(!error);
    });
  });
};

// path

/**
 * sips
 * @param {*} pngPath
 * @param {*} tmpDirName
 */
const sips = async (pngPath, tmpDirName) => {
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
  const bar = new qiaoCli.progress('electron-icns / sips... :current/:total', {
    total: cmds.length,
  });

  // run
  for (let i = 0; i < cmds.length; i++) {
    // cmd
    const res = await runCmd(cmds[i], options);
    if (!res) {
      console.log();
      console.log(qiaoCli.colors.red('electron-icns / sips / failed'));
      await rmTempDir(tmpDirName);
      return;
    }

    // run
    bar.tick();
    if (bar.complete) return options;
  }
};

// path

/**
 * iconutil
 * @param {*} options
 * @param {*} tmpDirName
 * @returns
 */
const iconutil = async (options, tmpDirName) => {
  const cmd = 'iconutil -c icns tmp.iconset -o icon.icns';
  const res = await runCmd(cmd, options);

  // fail
  if (!res) {
    await rmTempDir(tmpDirName);
    console.log(qiaoCli.colors.red('electron-icns / iconutil / failed'));

    return;
  }

  // success
  console.log('electron-icns / iconutil / success');
  await rmTempDir(tmpDirName);

  const icnsPath = path.resolve(options.cwd, './icon.icns');
  console.log(qiaoCli.colors.green(`electron-icns / success ${icnsPath}`));
  console.log();

  return icnsPath;
};

// colors

/**
 * icon
 */
const icns = async (pngPath) => {
  // darwin
  if (process.platform !== 'darwin') {
    console.log(qiaoCli.colors.red('electron-icns / failed: only support on macos'));
    return;
  }

  // check
  if (!pngPath) {
    console.log(qiaoCli.colors.red('electron-icns / failed: need png path'));
    return;
  }
  if (!(await qiaoFile.isExists(pngPath))) {
    console.log(qiaoCli.colors.red('electron-icns / failed: png not exists'));
    return;
  }

  // log
  console.log('electron-icns / from', pngPath);

  // tmp.iconset
  const tmpDirName = await tmpDir(pngPath);
  if (!tmpDirName) return;

  // sips
  const options = await sips(pngPath, tmpDirName);
  if (!options) return;

  // iconutil
  const icnsPath = await iconutil(options, tmpDirName);
  return icnsPath;
};

exports.icns = icns;
