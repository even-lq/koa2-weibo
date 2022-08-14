/**
 * @description 广场页 API 路由
 */

const router = require('koa-router')();
const { getSquareBlogList } = require('../../controller/blog-square');
const { loginCheck } = require('../../middlewares/loginChecks');
const { getBlogListStr } = require('../../utils/blog');


router.prefix('/api/square');

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck,  async (ctx, next) => {
  let{ pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const res = await getSquareBlogList(pageIndex);
  res.data.blogListTpl = getBlogListStr(res.data.blogList);
  ctx.body = res;
});

module.exports = router;