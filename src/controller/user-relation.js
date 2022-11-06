/**
 * @description 用户关系
 */

const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { getUsersByFollower, getFollowersByUser, addFollower, deleteFollower } = require('../service/user-relation');

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

/**
 * 根据 userID 获取已关注的人列表
 * @param {number} userId 用户 ID
 */
async function getFollowers(userId) {
  // service
  const { count:followersCount, userList: followersList } = await getFollowersByUser(userId);

  return new SuccessModel({
    followersCount,
    followersList
  });
}

/**
 * 
 * @param {number} userId 当前登录的用户 id
 * @param {number} followerId 需要关注的用户 id
 */
async function followUser(userId, followerId) {
  // service
  try {
    await addFollower(userId, followerId);
    return new SuccessModel();  
  } catch (error) {
    return new ErrorModel(addFollowerFailInfo);
  }
}

/**
 * 
 * @param {number} userId 当前登录的用户 id
 * @param {number} followerId 需要取消关注的用户 id
 */
async function unFollowUser(userId, followerId) {
  // service
  const res = await deleteFollower(userId, followerId);
  if(res) {
    return new SuccessModel();  
  } 
  return new ErrorModel(deleteFollowerFailInfo);

}

module.exports = {
  getFans,
  followUser,
  unFollowUser,
  getFollowers
};