/**
 * @description 广场页 controller
 */
const { PAGE_SIZE } = require('../conf/constant');
const { SuccessModel } = require('../model/ResModel');
const { getSquareCacheList } = require('../cache/blog');


/**
 * 
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页面
 */
async function getSquareBlogList(pageIndex = 0) {
  // cache
  const res = await getSquareCacheList(pageIndex, PAGE_SIZE);
  const blogList = res.blogList;

  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: res.count
  });
}

module.exports = {
  getSquareBlogList
};