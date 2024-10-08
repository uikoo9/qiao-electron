#!/usr/bin/env node

'use strict';

// qiao
const qiao = {};
qiao.cli = require('qiao-cli');

// cmds
require('./qelectron-pack.js');
require('./qelectron-zip.js');
require('./qelectron-pack-win.js');
require('./qelectron-pack-dmg.js');
require('./qelectron-upload-dmg.js');
require('./qelectron-version.js');

// parse
qiao.cli.cmd.parse(process.argv);
