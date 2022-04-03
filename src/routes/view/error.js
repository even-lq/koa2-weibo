/**
 * @description error 404 路由
 */

const router = require('koa-router')();

// error
router.get('/error', async (ctx, next) => {
  await ctx.render('error');
});

// 404 （什么路由都没命中，就会命中*，所有路由）
router.get('*', async (ctx, next) => {
  await ctx.render('404');
});

module.exports = router;