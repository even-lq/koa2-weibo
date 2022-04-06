/**
 * @description user API 路由
 */

const router = require('koa-router')();
const { isExist } = require('../../controller/user');

router.prefix('/api/user');

// 注册路由
router.post('/register', async (ctx, next) =>{

});

// 用户名（账号）是否存在 路由
router.post('/isExist', async (ctx, next) =>{
  const { userName } = ctx.request.body;

  // controller
  ctx.body = await isExist(userName);
});

module.exports = router;