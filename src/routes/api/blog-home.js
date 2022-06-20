/**
 * @description 首页API路由
 */

const { create } = require('../../controller/blog-home');
const { loginCheck } = require('../../middlewares/loginChecks');
const { genValidator } = require('../../middlewares/validator');
const blogValidate = require('../../validator/blog');

const router = require('koa-router')();

router.prefix('/api/blog');

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body;
  const { id: userId } = ctx.session.userInfo;

  // controller
  ctx.body = await create({ userId, content, image });
  console.log('weibo body', ctx.body);
});

module.exports = router;