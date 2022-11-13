/**
 * @description 用户关系
 */

const { User, UserRelation } = require('../db/model');
const { formatUser } = require('./_format');
const Sequelize = require('sequelize');

/**
 * 通过【关注了谁】也就是followerId找到粉丝
 * @param {number} followerId 被关注人的id
 */
async function getUsersByFollower(followerId) {
  const res = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId,
          userId: {

            // userId !== followerId，过滤自己
            // Sequelize.option.not equal
            [Sequelize.Op.ne]: followerId
          }
        }
      }
    ]
  });

  let userList = res.rows.map(row => row.dataValues);
  userList = formatUser(userList);

  return {
    count: res.count,
    userList
  };
}

/**
 * 通过用户Id查询其取消关注了的人的列表
 * @param {number} userId 用户id
 */
async function getFollowersByUser(userId) {
  const res = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ],
    where: {
      userId,
      followerId: {

        //  followerId !== userId，过滤自己
        // Sequelize.option.not equal
        [Sequelize.Op.ne]: userId
      }
    }
  });

  let userList = res.rows.map(row => row.dataValues);
  console.log(userList);
  console.log('-------------');
  userList = userList.map(item => {
    let user = item.user;
    console.log(user);
    user = user.dataValues;
    user = formatUser(user);
    return user;
  });
  console.log({
    count: res.count,
    userList
  });

  return {
    count: res.count,
    userList
  };
}

/**
 * 添加粉丝关系
 * @param {number} userId 用户id
 * @param {number} followerId 被该用户关注的用户id
 */
async function addFollower(userId, followerId) {
  const res = await UserRelation.create({
    userId,
    followerId
  });
  return res.dataValues;
}

/**
 * 删除粉丝关系
 * @param {number} userId 用户id
 * @param {number} followerId 被该用户取消关注的用户id
 */
async function deleteFollower(userId, followerId) {
  const res = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  });
  return res > 0;
}

module.exports = {
  getUsersByFollower,
  getFollowersByUser,
  addFollower,
  deleteFollower
};