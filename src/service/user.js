/**
 * @description user service
 */

const { User } = require('../db/model/index');
const { formatUser } = require('./_format');

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  
  // 查询条件
  const whereOpt = {
    userName
  };
  password && Object.assign(whereOpt, { password });

  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  });

  // 格式化
  return result ? formatUser(result.dataValues) : result;
}

/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别：1.男 2.女 3.保密
 * @param {string} nickName 昵称
 */
async function createUser({userName, password, gender = 3, nickName = userName}) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName
  });
  return result.dataValues;
}

module.exports = {
  getUserInfo,
  createUser
};