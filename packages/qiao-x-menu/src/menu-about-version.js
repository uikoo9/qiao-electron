// electron
import { app } from 'electron';

/**
 * setAboutVersion
 * @param {*} version
 */
export const setAboutVersion = (version) => {
  const v = version || '0.0.1';
  app.setAboutPanelOptions({
    applicationVersion: v,
    version: v,
  });
};
