/**
 * @description 微博service
 */

const { Blog } = require('../db/model/index');

/**
 * 创建微博
 * @param {Object} param0 创建微博所需要的数据
 */
async function createBlog({ userId, content, image }) {
  const res = Blog.create({ userId, content, image });
  return res.dataValues;
}

module.exports = {
  createBlog
};