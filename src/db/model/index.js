/**
 * @description 数据模型入口文件
 */

const User = require('./User');
const Blog = require('./Blog');

// 创建Blog的外键
Blog.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = {
  User,
  Blog 
};
