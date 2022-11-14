/**
 * @description 微博service
 */

const { Blog, User, UserRelation } = require('../db/model/index');
const { formatUser, formatBlog } = require('./_format');

/**
 * 创建微博
 * @param {Object} param0 创建微博所需要的数据
 */
async function createBlog({ userId, content, image }) {
  const res = await Blog.create({ userId, content, image });
  // console.log('service blog', res.dataValues);
  return res.dataValues;
}

/**
 * 根据用户获取微博列表
 * @param {Object} param0 微博列表查询参数
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {

  // 拼接查询条件
  const userWhereOpts = {};
  if (userName) {
    userWhereOpts.userName = userName;
  }

  // 执行查询
  // 因为Blog.belongsTo(User),才能 Blog.findAndCountAll
  const res = await Blog.findAndCountAll({
    limit: pageSize, // 限制查询条目
    offset: pageSize * pageIndex, // 跳过多少条
    order: [
      ['id', 'desc']
    ], // 根据id倒序查询
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  });

  // 获取 dataValues
  let blogList = res.rows
    .map(row => {
      // console.log(row.dataValues);
      return row.dataValues;
    });
  blogList = formatBlog(blogList);

  blogList.map(blogItem => {
    const user = blogItem.user.dataValues;
    blogItem.user = formatUser(user);
    return blogItem; 
  });

  return {
    count: res.count,
    blogList
  };
}

/**
 * 获取该用户已关注的人的微博列表
 * @param {Object} param0 
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
  
  // 三表查询，查找blog，inner join user和userRelation
  const res = await Blog.findAndCountAll({
    limit: pageSize, // 每页有多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: { userId }
      }
    ]
  });
  console.log(res);
  console.log('--------------test');

  // 格式化
  let blogList = res.rows.map(row => row.dataValues);
  blogList = formatBlog(blogList);
  blogList = blogList.map(blogItem => {
    blogItem.user = formatUser(blogItem.user.dataValues);
    return blogItem;
  });

  return {
    count: res.count,
    blogList
  };
}

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList 
};