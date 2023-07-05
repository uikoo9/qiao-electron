// electron
import { BrowserWindow } from 'electron';

/**
 * openWindowByFile
 * @param {*} filePath
 * @param {*} options
 * @returns
 */
export const openWindowByFile = async (filePath, options) => {
  try {
    if (!filePath) {
      console.log('open window by file failed: need filePath');
      return;
    }

    // create window
    const win = new BrowserWindow(options);

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
export const openWindowByUrl = async (url, options) => {
  try {
    if (!url) {
      console.log('open window by url failed: need url');
      return;
    }

    // create window
    const win = new BrowserWindow(options);

    // load file
    await win.loadURL(url);
    return win;
  } catch (error) {
    console.log('open window by url failed.');
    console.log(error);
  }
};
