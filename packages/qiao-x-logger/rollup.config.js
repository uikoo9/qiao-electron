/**
 * rollup.config.js
 */
module.exports = {
  input: 'src/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
  },
  external: ['electron', 'path', 'qiao-downloader', 'qiao-zip', 'qiao-file', 'qiao.log.js'],
};
