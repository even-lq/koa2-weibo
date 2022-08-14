/**
 * @description 博客缓存层
 */

const { get, set } = require('./_redis');
const { getBlogListByUser } = require('../service/blog');

// redis key 前缀
const KEY_PREFIX = 'weibo:square:';

/**
 * 获取广场列表的缓存
 * @param {number} pageIndex 页码
 * @param {number} pageSize 分页总数
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`;

  // 获取缓存
  const cacheRes = await get(key);
  console.log(cacheRes);
  if (cacheRes !== null) {
    // 获取缓存成功
    return cacheRes;
  }

  // 没有缓存，则读取数据库
  const res = await getBlogListByUser({pageIndex, pageSize});
  // console.log('res', res);

  // 设置缓存
  set(key, res, 60);
  return res;
}

module.exports = {
  getSquareCacheList
};