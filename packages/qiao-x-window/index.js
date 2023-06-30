'use strict';

var electron = require('electron');

// electron

/**
 * openWindowByFile
 * @param {*} filePath
 * @param {*} options
 * @returns
 */
const openWindowByFile = async (filePath, options) => {
  try {
    if (!filePath) {
      console.log('open window by file failed: need filePath');
      return;
    }

    // create window
    const win = new electron.BrowserWindow(options);

    // load file
    await win.loadFile('./renderer/index.html');
    return win;
  } catch (error) {
    console.log('open window by file failed.');
    console.log(error);
  }
};

exports.openWindowByFile = openWindowByFile;