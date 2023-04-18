#!/usr/bin/env node

// qiao
const cli = require('qiao-cli');

// cmds
require('./icns-icon.js');
require('./icns-version.js');

// parse
cli.cmd.parse(process.argv);
