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

module.exports = {
  createAtRelation
};