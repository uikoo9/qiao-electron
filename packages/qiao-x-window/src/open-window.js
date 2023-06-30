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
    await win.loadFile('./renderer/index.html');
    return win;
  } catch (error) {
    console.log('open window by file failed.');
    console.log(error);
  }
};
