/**
 * @description 微博view路由
 */

const router = require('koa-router')();
const { loginRedirect } = require('../../middlewares/loginChecks');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { getSquareBlogList } = require('../../controller/blog-square');
const { 
  isExist,
} = require('../../controller/user');
const { getFans, getFollowers } = require('../../controller/user-relation');
const { getHomeBlogList } = require('../../controller/blog-home');
const { getAtMeCount, getAtMeBlogList, markAsRead } =require('../../controller/blog-at');

router.get('/', loginRedirect, async (ctx, next) => {

  const userInfo = ctx.session.userInfo;
  const { id: userId } = userInfo;

  // 获取首页数据
  // controller
  const res = await getHomeBlogList(userId);
  const {
    isEmpty,
    blogList,
    pageSize,
    pageIndex,
    count
  } = res.data;
  
  // 获取粉丝
  const fansRes = await getFans(userId);
  const { fansCount, userList: list } = fansRes.data;

  // 获取已关注的人
  const followersRes = await getFollowers(userId);
  const { followersCount, followersList } = followersRes.data;

  // 获取at 我的数量
  const atCountRes = await getAtMeCount(userId);

  await ctx.render('index', {
    userData: {
      userInfo,
      fansData: {
        count: fansCount,
        list
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      atCount: atCountRes.data.count
    },
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  });

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

  // 获取粉丝
  const fansRes = await getFans(curUserInfo.id);
  const { fansCount, userList: list } = fansRes.data;

  // 获取已关注的人
  const followersRes = await getFollowers(curUserInfo.id);
  const { followersCount, followersList } = followersRes.data;
  
  // 我是否关注了此人?
  const amIFollowed = list.some(item => item.userName === myUserName);

  // 获取at 我的数量
  const atCountRes = await getAtMeCount(myUserInfo.id);

  await ctx.render('profile', {
    blogData: {
      isEmpty, blogList, pageSize, pageIndex, count
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      amIFollowed,
      atCount: atCountRes.data.count,
      fansData: {
        count: fansCount,
        list
      },
      followersData: {
        count: followersCount,
        list: followersList
      }
    }
  });
});

// 广场页
router.get('/square', loginRedirect, async (ctx, next) => {
  // controller
  const res = await getSquareBlogList(0);
  const { isEmpty, blogList, pageSize, pageIndex, count } = res.data;
  await ctx.render('square', {
    blogData: {
      isEmpty, blogList, pageSize, pageIndex, count
    }
  });
});

// 艾特我的
router.get('/at-me', loginRedirect, async (ctx, next) => {

  const { id: userId } = ctx.session.userInfo;
  // 获取@数量
  const atCountRes = await getAtMeCount(userId);
  const atCount = atCountRes.data.count;

  // 获取第一页列表
  // controller
  const res = await getAtMeBlogList(userId);
  const { isEmpty, blogList, pageSize, pageIndex, count } = res.data;

  // 渲染页面
  await ctx.render('atMe', {
    atCount,
    blogData: {
      isEmpty, blogList, pageSize, pageIndex, count
    }
  });

  // 标记为已读(渲染页面后，优化性能)
  if (atCount > 0) {
    await markAsRead(userId);
  }
});

module.exports = router;
