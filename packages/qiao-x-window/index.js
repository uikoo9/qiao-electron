'use strict';

var electron = require('electron');

// electron

/**
 * getWindowByEvent
 * @param {*} event
 * @returns
 */
function getWindowByEvent(event) {
  // check
  if (!event || !event.sender) return;

  // return
  return electron.BrowserWindow.fromWebContents(event.sender);
}

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
    await win.loadFile(filePath);
    return win;
  } catch (error) {
    console.log('open window by file failed.');
    console.log(error);
  }
};

/**
 * openWindowByUrl
 * @param {*} url
 * @param {*} options
 * @returns
 */
const openWindowByUrl = async (url, options) => {
  try {
    if (!url) {
      console.log('open window by url failed: need url');
      return;
    }

    // create window
    const win = new electron.BrowserWindow(options);

    // load file
    await win.loadURL(url);
    return win;
  } catch (error) {
    console.log('open window by url failed.');
    console.log(error);
  }
};

exports.getWindowByEvent = getWindowByEvent;
exports.openWindowByFile = openWindowByFile;
exports.openWindowByUrl = openWindowByUrl;
