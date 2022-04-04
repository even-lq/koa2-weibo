/**
 * @description 连接redis的方法
 */

const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');
const { host, port } = REDIS_CONF;

// 创建客户端
const redisClient = redis.createClient(port, host);
redisClient.on('error', err => {
  console.error('redis error', err);
});

/**
 * redis set
 * @param {string} key key
 * @param {string} val val
 * @param {number} timeout 过期时间，单位s
 */
// 数据保质期 60s * 60 一个小时
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout);
}

/**
 * redis get
 * @param {string} key key
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      
      // 找不到val或者val过期了
      if (!val) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(val));
      } catch (error) {

        // 如果不能JSON.parse
        resolve(val);
      }
    });
  });
  return promise;
}

module.exports = {
  set,
  get
};