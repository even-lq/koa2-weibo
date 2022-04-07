/**
 * @description user view路由
 */

const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginChecks');

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

router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo);
});

module.exports = router;