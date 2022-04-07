/**
 * @description user controller
 */

const { getUserInfo, createUser } = require('../service/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { 
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
} = require('../model/ErrorInfo');
const doCrypto = require('../utils/cryp');

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

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别：1.男 2.女 3.保密
 */
async function register({userName, password, gender}) {
  
  // 业务逻辑处理
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo);
  }

  // 调用注册service层
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    });
    return new SuccessModel();
  } catch (error) {
    console.error(ex.message, ex.stack);
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  
  // 业务逻辑处理
  const userInfo = await getUserInfo(userName, doCrypto(password));
  if (!userInfo) {
    return new ErrorModel(loginFailInfo);
  }

  // 登陆成功后把用户信息放到session中
  if (!ctx.session.userInfo) {
    ctx.session.userInfo = userInfo;
  }
  return new SuccessModel();
}

module.exports = {
  isExist,
  register,
  login
};