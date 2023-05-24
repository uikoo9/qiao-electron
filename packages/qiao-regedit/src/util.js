// iconv
import iconv from 'iconv-lite';

// encoding
const encoding = 'cp936';

/**
 * binary encoding
 */
export const binaryEncoding = 'binary';

/**
 * msg
 */
export const msg = (err, stdout, stderr) => {
  return err ? decode(stderr) : decode(stdout);
};

/**
 * decode
 */
function decode(s) {
  return iconv.decode(Buffer.from(s, exports.binaryEncoding), encoding);
}
