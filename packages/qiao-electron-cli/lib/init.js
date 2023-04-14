'use strict';

// path
const path = require('path');

// q
const q = require('qiao-file');

/**
 * init
 */
module.exports = async function (destPath) {
  const src = path.resolve(__dirname, '../_demo');
  const dest = path.resolve(destPath, './electron');

  await q.cp(src, dest);
};
