/**
 * @description 微博view路由
 */

const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginChecks');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { 
  isExist,
} = require('../../controller/user');

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {});
});

router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  ctx.redirect(`/profile/${userName}`);
});

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  // 已登录用户的信息
  const myUserInfo = ctx.session.userInfo;
  const myUserName = myUserInfo.userName;
  let curUserInfo;

  // 解析路由参数
  const { userName: curUserName } = ctx.params;
  const isMe = myUserName === curUserName;
  if (isMe) {
    
    // 是当前登录用户
    curUserInfo = myUserInfo;
  } 
  else {
    // 不是当前登录用户
    const existRes = await isExist(curUserName);
    if (existRes.errno !== 0) {
      // 用户不存在
      return;
    }
    // 用户名存在
    curUserInfo = existRes.data;
  }

  // 获取微博第一页数据
  // controller
  const res = await getProfileBlogList(curUserName, 0);
  const { isEmpty, blogList, pageSize, pageIndex, count } = res.data;
  await ctx.render('profile', {
    blogData: {
      isEmpty, blogList, pageSize, pageIndex, count
    },
    userData: {
      userInfo: curUserInfo,
      isMe
    }
  });
});

module.exports = router;
