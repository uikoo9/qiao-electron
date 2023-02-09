'use strict';

// path
const path = require('path');

// q
const q = require('qiao-file');

/**
 * init
 */
module.exports = function (destPath) {
  const src = path.resolve(__dirname, '../_demo');
  const dest = path.resolve(destPath, './electron');

  q.cp(src, dest);
};
