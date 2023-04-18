// cp
import { exec } from 'child_process';

/**
 * run cmd
 * @param {*} cmd
 * @param {*} options
 * @returns
 */
export const runCmd = (cmd, options) => {
  return new Promise((resolve) => {
    exec(cmd, options, (error) => {
      return resolve(!error);
    });
  });
};
