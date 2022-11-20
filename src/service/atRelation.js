/**
 * @description 微博 @ 用户关系 service
 */

const { AtRelation } = require('../db/model');

/**
 * 
 * @param {number} blogId 微博id
 * @param {number} userId 用户id
 * @returns 
 */
async function createAtRelation(blogId, userId) {
  const res = await AtRelation.create({blogId,  userId });
  return res.dataValues;
}

/**
 * 获取 @ 用户的微博数量（未读的） 
 * @param {number} userId 用户id
 * @returns 
 */
async function getAtRelationCount(userId) {
  const res = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  });
  return res.count;
}

module.exports = {
  createAtRelation,
  getAtRelationCount
};