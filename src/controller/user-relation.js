/**
 * @description 用户关系
 */

const { SuccessModel } = require('../model/ResModel');
const { getUsersByFollower } = require('../service/user-relation');

/**
 * 根据 userID 获取粉丝列表
 * @param {number} userId 用户 ID
 */
async function getFans(userId) {
  // service
  const { count:fansCount, userList } = await getUsersByFollower(userId);

  return new SuccessModel({
    fansCount,
    userList
  });
}

module.exports = {
  getFans
};