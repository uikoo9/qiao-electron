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
