/**
 * @description user controller
 */

const { getUserInfo } = require('../service/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo');

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  
  // 业务逻辑处理（无）
  // 调用service层
  // 统一返回格式
  const userInfo = await getUserInfo(userName);
  return userInfo
    ? new SuccessModel(userInfo)
    : new ErrorModel(registerUserNameNotExistInfo);
}

module.exports = {
  isExist
};