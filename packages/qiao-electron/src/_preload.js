// darkmode
import { darkModeChangeIPC, darkModeGetIPC } from './darkmode/darkmode-preload.js';

// fs
import { fsRmIPC, fsMkdirIPC, fsRenameIPC, fsGetTreeIPC, fsReadFileIPC, fsWriteFileIPC } from './fs/fs-preload.js';

// log
import { logIPC } from './log/log-preload.js';

// ls
import { lsAllIPC, lsGetIPC, lsSetIPC, lsDelIPC } from './ls/ls-preload.js';

// shell
import { shellOpenUrlIPC, shellShowPathIPC } from './shell/shell-preload.js';

// shortcut
import { shortcutGlobalIPC } from './shortcut/shortcut-preload.js';

// window
import { windowResizeIPC } from './window/window-preload.js';

/**
 * getPreloads
 * @param {*} customPreloads
 * @returns
 */
export const getPreloads = (customPreloads) => {
  const defaultPreloads = {
    darkModeChangeIPC,
    darkModeGetIPC,
    fsRmIPC,
    fsMkdirIPC,
    fsRenameIPC,
    fsGetTreeIPC,
    fsReadFileIPC,
    fsWriteFileIPC,
    logIPC,
    lsAllIPC,
    lsGetIPC,
    lsSetIPC,
    lsDelIPC,
    shellOpenUrlIPC,
    shellShowPathIPC,
    shortcutGlobalIPC,
    windowResizeIPC,
  };

  return { ...defaultPreloads, ...customPreloads };
};
