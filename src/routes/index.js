const router = require('koa-router')();

router.get('/', async (ctx, next) => {

  // 读取模板文件，io操作是异步的
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  });
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  };
});

module.exports = router;
