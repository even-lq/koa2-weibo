/**
 * @description user view路由
 */

const router = require('koa-router')();

/**
 * 获取登录信息
 * @param {Object} ctx 
 */
function getLoginInfo(ctx) {
  return ctx.session && ctx.session.userInfo
    ? {
      isLogin: true,
      userName: ctx.session.userInfo.userName
    }
    : {
      isLogin: false
    };
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx));
});

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx));
});
module.exports = router;