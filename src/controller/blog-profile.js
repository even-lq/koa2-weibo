/**
 * @description 个人主页 controller
 */
const { getBlogListByUser } = require('../service/blog');
const { PAGE_SIZE } = require('../conf/constant');
const { SuccessModel, ErrorModel } = require('../model/ResModel');


/**
 * 
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页面
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  // services
  const res = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  });
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
  getProfileBlogList
};