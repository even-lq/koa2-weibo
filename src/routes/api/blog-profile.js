/**
 * @description 个人主页 API 路由
 */

const router = require('koa-router')();
const { getProfileBlogList } = require('../../controller/blog-profile');
const { followUser, unFollowUser } = require('../../controller/user-relation');
const { loginCheck } = require('../../middlewares/loginChecks');
const { getBlogListStr } = require('../../utils/blog');


router.prefix('/api/profile');

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck,  async (ctx, next) => {
  let{ userName, pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const res = await getProfileBlogList(userName, pageIndex);
  res.data.blogListTpl = getBlogListStr(res.data.blogList);
  ctx.body = res;
});

// 加载更多
router.post('/follow', loginCheck,  async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo;
  const { userId: followerId } = ctx.request.body;

  // controller
  ctx.body = await followUser(myUserId, followerId);
  console.log('res follow', ctx.body);
});

// 加载更多
router.post('/unFollow', loginCheck,  async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo;
  const { userId: followerId } = ctx.request.body;

  // controller
  ctx.body = await unFollowUser(myUserId, followerId);
});

module.exports = router;