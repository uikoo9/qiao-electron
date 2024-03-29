'use strict';

var child_process = require('child_process');
var iconv = require('iconv-lite');

// iconv

// encoding
const encoding = 'cp936';

/**
 * binary encoding
 */
const binaryEncoding = 'binary';

/**
 * msg
 */
const msg = (err, stdout, stderr) => {
  return err ? decode(stderr) : decode(stdout);
};

/**
 * decode
 */
function decode(s) {
  return iconv.decode(Buffer.from(s, exports.binaryEncoding), encoding);
}

/* eslint-disable no-useless-escape */

// default type
const defaultType = 'REG_SZ';

/**
 * add value
 * 	obj
 * 		key
 * 		name
 * 		type
 * 		data
 * 	cb
 */
const addValue = (obj, cb) => {
  if (!obj || !obj.key || !obj.name || !obj.data) {
    if (cb) cb('need key,name,data');
    return;
  }

  obj.type = obj.type || defaultType;

  child_process.exec(
    `reg add \"${obj.key}\" /v \"${obj.name}\" /t \"${obj.type}\" /d \"${obj.data}\" /f`,
    { encoding: binaryEncoding },
    function (err, stdout, stderr) {
      if (cb) cb(msg(err, stdout, stderr));
    },
  );
};

/**
 * del value
 * 	obj
 * 		key
 * 		name
 * 	cb
 */
const delValue = (obj, cb) => {
  if (!obj || !obj.key || !obj.name) {
    if (cb) cb('need key,name');
    return;
  }

  child_process.exec(
    `reg delete \"${obj.key}\" /v \"${obj.name}\" /f`,
    { encoding: binaryEncoding },
    function (err, stdout, stderr) {
      if (cb) cb(msg(err, stdout, stderr));
    },
  );
};

/**
 * list values
 * 	key
 * 	cb
 */
const listValues = (key, cb) => {
  const cmdQueryAll = `reg query \"${key}\"`;

  child_process.exec(cmdQueryAll, { encoding: binaryEncoding }, function (err, stdout, stderr) {
    const res = msg(err, stdout, stderr);
    const completeKey = getCompleteKey(key);
    if (res.indexOf(completeKey) === -1) {
      if (cb) cb(res);
      return;
    }

    const list = [];

    const ss = res.split('\r\n');
    if (!ss || !ss.length) {
      if (cb) cb(res);
      return;
    }

    for (let s of ss) {
      if (!s) continue;
      if (s.indexOf(completeKey) > -1) continue;

      const index = s.indexOf('REG_');
      if (!index) continue;

      let keyName = s.substring(0, index);
      keyName = keyName.replace(/(^\s*)|(\s*$)/g, '');
      list.push(keyName);
    }

    if (cb) cb(null, list);
  });
};

// get complete key
function getCompleteKey(key) {
  if (key.indexOf('HKCU') === 0) return key.replace(/HKCU/g, 'HKEY_CURRENT_USER');
}

exports.addValue = addValue;
exports.delValue = delValue;
exports.listValues = listValues;
