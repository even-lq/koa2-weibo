/**
 * @description 微博 @ 关系 controller
 */

const { getAtRelationCount } = require('../service/atRelation');
const { SuccessModel } = require('../model/ResModel');

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

module.exports = {
  getAtMeCount
};