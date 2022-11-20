/**
 * @description 首页  controller
 */
const xss = require('xss');
const { createBlogFailInfo, getBlogListFailInfo } = require('../model/ErrorInfo');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlog } = require('../service/blog');
const { getFollowersBlogList } = require('../service/blog');
const { getUserInfo } = require('../service/user');
const { createAtRelation } = require('../service/atRelation');
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant');

/**
 * 创建微博
 * @param {Object} param0 创建微博所需要的数据
 */
async function create({ userId, content, image }) {
  // 分析并收集 content 中的@用户
  // content 格式如 '@xx - xx'
  const atUserNameList = [];
  content = content.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      
      // 目的是获取userName
      atUserNameList.push(userName);
      return matchStr;
    }
  );

  // 根据@用户名查询用户信息
  const atUserList = await Promise.all(
    atUserNameList.map(userName => getUserInfo(userName))
  );

  // 根据用户信息，获取用户id
  const atUserIdList = atUserList.map(user => user.id);
  
  // service
  try {
    
    // 创建微博
    const blog = await createBlog({ userId, content: xss(content), image });

    // 创建@关系
    await Promise.all(atUserIdList.map(
      userId => createAtRelation(blog.id, userId)
    ));

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