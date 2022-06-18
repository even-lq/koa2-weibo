/**
 * @description 加密方法
 */

const crypto = require('crypto');
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys');

/**
 * md5加密
 * @param {string} content 
 */
function _md5(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * 加密方法
 * @param {string} content 明文
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`;
  return _md5(str);
}


module.exports = doCrypto;