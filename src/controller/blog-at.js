/**
 * @description 微博 @ 关系 controller
 */

const { getAtRelationCount, getAtUserBlogList, updateAtRelation } = require('../service/atRelation');
const { SuccessModel } = require('../model/ResModel');
const {  PAGE_SIZE } = require('../conf/constant');

/**
 * 获取@ 我的微博数量
 * @param {number} userId 用户唯一标识
 */
async function getAtMeCount(userId) {
  
  // service
  const count = await getAtRelationCount(userId);
  return new SuccessModel({
    count
  });
}

/**
 * 获取@ 我的微博列表
 * @param {number} userId 用户唯一标识
 * @param {number} pageIndex 页码
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  
  // service
  const res = await getAtUserBlogList({userId, pageIndex, pageSize: PAGE_SIZE});
  const { count, blogList } = res;
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  });
}

/**
 * 获取@ 我的微博列表
 * @param {number} userId 用户唯一标识
 * @param {number} pageIndex 页码
 */
async function markAsRead(userId) {
  
  // service
  try {
    await updateAtRelation(
      { newIsRead: true },
      { userId, isRead: false }
    );
  } catch (error) {
    console.error(ex);
  }
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
};