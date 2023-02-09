'use strict';

// path
const path = require('path');

// q
const q = require('qiao-file');

// checker
const checker = require('./_check.js');

/**
 * dist
 * @param {*} srcPath
 * @param {*} distPath
 * @param {*} srcFiles
 * @returns
 */
module.exports = function (config) {
  // check
  checker.checkConfig(config);

  // consts
  const root = process.cwd();
  const src = path.resolve(root, config.srcPath);
  const dist = path.resolve(root, config.distPath);
  const srcFiles = config.srcFiles;

  // mkdir
  mkDir(dist);

  // cp file or folder
  for (let i = 0; i < srcFiles.length; i++) cpFileOrFolder(src, dist, srcFiles[i]);
};

// make electron-dist dir
function mkDir(dir) {
  let res = 'success';
  try {
    // rm
    if (q.isExists(dir)) q.rm(`${dir}/`);

    // mkdir
    q.mkdir(`${dir}/`);
  } catch (e) {
    console.log(e);
    res = 'fail';
  }

  console.log(`make dir: ${dir} ${res}`);
}

// cp file or folder
function cpFileOrFolder(src, dest, file) {
  const srcFilePath = path.resolve(src, file);
  const destFilePath = path.resolve(dest, file);

  let res = 'success';
  try {
    q.cp(srcFilePath, destFilePath);
  } catch (e) {
    console.log(e);
    res = 'fail';
  }

  console.log(`cp: ${srcFilePath} ${res}`);
}
