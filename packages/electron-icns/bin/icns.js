#!/usr/bin/env node

// path
const path = require('path');

// cli
const cli = require('qiao-cli');

// icns
const { icns } = require('../index.js');

// run
async function run() {
  try {
    // argv
    const argv = process.argv;
    if (!argv || argv.length < 3) {
      console.log(cli.colors.red('electron-icns / start / failed: need png path'));
      return;
    }

    // path
    let pngPath = argv[2];
    if (!path.isAbsolute(pngPath)) pngPath = path.resolve(process.cwd(), pngPath);

    await icns(pngPath);
  } catch (e) {
    console.log('electron-icns / error');
    console.log();

    console.error(e);
  }
}
run();
