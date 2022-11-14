/**
 * @description 首页  controller
 */
const xss = require('xss');
const { createBlogFailInfo, getBlogListFailInfo } = require('../model/ErrorInfo');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlog } = require('../service/blog');
const { getFollowersBlogList } = require('../service/blog');
const { PAGE_SIZE } = require('../conf/constant');

/**
 * 创建微博
 * @param {Object} param0 创建微博所需要的数据
 */
async function create({ userId, content, image }) {
  
  // service
  try {
    
    // 创建微博
    const blog = await createBlog({ userId, content: xss(content), image });
    return new SuccessModel(blog);
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(createBlogFailInfo);
  }
}

/**
 * 获取首页微博列表
 * @param {number} userId 用户唯一标识
 * @param {number} pageIndex 
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  
  // service
  try {
    const res = await getFollowersBlogList({
      userId,
      pageIndex,
      pageSize: PAGE_SIZE
    });
    
    const { count, blogList } = res;
    return new SuccessModel({
      isEmpty: blogList.length === 0,
      blogList,
      pageSize: PAGE_SIZE,
      pageIndex,
      count
    });
  } catch (ex) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(getBlogListFailInfo);
  }
}

module.exports = {
  create,
  getHomeBlogList
};