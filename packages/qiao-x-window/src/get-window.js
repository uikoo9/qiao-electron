// electron
import { BrowserWindow } from 'electron';

/**
 * getWindowByEvent
 * @param {*} event
 * @returns
 */
export function getWindowByEvent(event) {
  // check
  if (!event || !event.sender) return;

  // return
  return BrowserWindow.fromWebContents(event.sender);
}

/**
 * getWindowByTitle
 * @param {*} title
 */
export function getWindowByTitle(title) {
  const allWindows = BrowserWindow.getAllWindows();
  for (let i = 0; i < allWindows.length; i++) {
    const win = allWindows[i];
    if (win.title === title) return win;
  }
}
