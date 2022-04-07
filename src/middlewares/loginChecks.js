/**
 * @description 登录验证的中间件
 */

const { 
  loginCheckFailInfo
} = require('../model/ErrorInfo');
const { ErrorModel } = require('../model/ResModel');

/**
 * API 登录验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    
    // 已登录
    await next();
    return;
  }

  // 未登录
  ctx.body = new ErrorModel(loginCheckFailInfo);
}

/**
 * 页面登录验证
 * @param {Object} ctx ctx
 * @param {function} next next
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    
    // 已登录
    await next();
    return;
  }

  console.log('?', ctx.url);
  // 未登录
  ctx.redirect(`/login?url=${encodeURIComponent(ctx.url)}`);
}

module.exports = {
  loginCheck,
  loginRedirect
};