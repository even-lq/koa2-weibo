/**
 * @description user API 路由
 */

const router = require('koa-router')();
const { 
  isExist,
  register,
  login 
} = require('../../controller/user');
const userValidate = require('../../validator/user');
const { genValidator } = require('../../middlewares/validator');

router.prefix('/api/user');

// 注册路由
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;

  // controller
  ctx.body = await register({userName, password, gender});
});

// 用户名（账号）是否存在 路由
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;

  // controller
  ctx.body = await isExist(userName);
});

// 登录路由
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body;

  // controller
  ctx.body = await login(ctx, userName, password);
});

module.exports = router;