/**
 * @description 微博 @ 用户关系 service
 */

const { AtRelation, Blog, User } = require('../db/model');
const { formatUser, formatBlog } = require('./_format');

/**
 * 
 * @param {number} blogId 微博id
 * @param {number} userId 用户id
 * @returns 
 */
async function createAtRelation(blogId, userId) {
  const res = await AtRelation.create({blogId,  userId });
  return res.dataValues;
}

/**
 * 获取 @ 用户的微博数量（未读的） 
 * @param {number} userId 用户id
 * @returns 
 */
async function getAtRelationCount(userId) {
  const res = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  });
  return res.count;
}

/**
 * 获取 @ 用户的微博列表
 * @param {number} params 
 * @returns 
 */
async function getAtUserBlogList({userId, pageIndex, pageSize = 10}) {

  // 因为用了Blog.hasMany所以可以用Blog.findAndCountAll
  // 内连接，输出满足三个表的行
  const res = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [['id', 'desc']],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: { userId }
      },
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  });

  // 格式化
  // 获取 dataValues
  let blogList = res.rows.map(row => row.dataValues);
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
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList
};