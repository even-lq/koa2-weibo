/**
 * @description 微博service
 */

const { Blog, User } = require('../db/model/index');
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

module.exports = {
  createBlog,
  getBlogListByUser
};