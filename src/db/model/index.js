/**
 * @description 数据模型入口文件
 */

const User = require('./User');
const Blog = require('./Blog');
const UserRelation = require('./UserRelation');
const AtRelation = require('./AtRelation');

// 创建Blog的外键，Blog表的userId是Blog表的外键，关联User表的Id
Blog.belongsTo(User, {
  foreignKey: 'userId'
});

// followerId，userId关注的人的id
UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
});

User.hasMany(UserRelation, {
  foreignKey: 'userId'
});

// 创建Blog的外键，Blog表的userId是Blog表的外键，关联UserRelation表的followerId
// 即使数据库里面没建成功，关系模型还是可以用于联表查询，联表查询与外键无关
Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
});

// 一条博客可以@很多人
Blog.hasMany(AtRelation, {
  foreignKey: 'blogId'
});

module.exports = {
  User,
  Blog,
  UserRelation,
  AtRelation
};
