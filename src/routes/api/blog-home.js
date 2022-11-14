/**
 * @description 首页API路由
 */

const { create, getHomeBlogList } = require('../../controller/blog-home');
const { loginCheck } = require('../../middlewares/loginChecks');
const { genValidator } = require('../../middlewares/validator');
const { getBlogListStr } = require('../../utils/blog');
const blogValidate = require('../../validator/blog');

const router = require('koa-router')();

router.prefix('/api/blog');

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image } = ctx.request.body;
  const { id: userId } = ctx.session.userInfo;

  // controller
  ctx.body = await create({ userId, content, image });
  // console.log('weibo body', ctx.body);
});

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck,  async (ctx, next) => {
  let { pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  let { id: userId } = ctx.session.userInfo;
  const res = await getHomeBlogList(userId, pageIndex);

  // 渲染模板
  res.data.blogListTpl = getBlogListStr(res.data.blogList);
  ctx.body = res;
});

module.exports = router;