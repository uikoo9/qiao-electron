/* eslint-disable no-useless-escape */

// exec
import { exec } from 'child_process';

// utile
import { binaryEncoding, msg } from './util.js';

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
export const addValue = (obj, cb) => {
  if (!obj || !obj.key || !obj.name || !obj.data) {
    if (cb) cb('need key,name,data');
    return;
  }

  obj.type = obj.type || defaultType;

  exec(
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
export const delValue = (obj, cb) => {
  if (!obj || !obj.key || !obj.name) {
    if (cb) cb('need key,name');
    return;
  }

  exec(`reg delete \"${obj.key}\" /v \"${obj.name}\" /f`, { encoding: binaryEncoding }, function (err, stdout, stderr) {
    if (cb) cb(msg(err, stdout, stderr));
  });
};

/**
 * list values
 * 	key
 * 	cb
 */
export const listValues = (key, cb) => {
  const cmdQueryAll = `reg query \"${key}\"`;

  exec(cmdQueryAll, { encoding: binaryEncoding }, function (err, stdout, stderr) {
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
