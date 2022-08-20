/**
 * @description 用户关系
 */

const { User, UserRelation } = require('../db/model');
const { formatUser } = require('./_format');

/**
 * 通过【关注了谁】也就是followerId找到粉丝
 * @param {number} params 被关注人的id
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
          followerId
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

module.exports = {
  getUsersByFollower
};