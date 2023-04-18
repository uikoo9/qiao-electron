// qiao
const cli = require('qiao-cli');

// cmd for common
cli.cmd
  .version(require('../package.json').version, '-v, --version')
  .description('electron-icns, generate electron icns icon')
  .usage('<command> [options]');
