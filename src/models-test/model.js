const Sequelize = require('sequelize');
const seq = require('../db/seq');

// 创建User模型，第一个参数是表名，会自动变成复数
const User = seq.define('user', {

  // id会自动创建并设置为主键、自增
  userName: {
    type: Sequelize.STRING, // varchar(255)
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称'
  }
  // 会自动创建createAt和updateAt
});

const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING, // varchar(255)
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    comment: '昵称'
  }
});

// 外键关联 多对一
// 连表查询：用belongsTo才可以执行从表（Blog）连带主表（User）的查询，比如
// Blog.findAndCountAll({
//   order: ['id', 'desc'],
//   include: [
//     {
//       model: User,
//       ....
//     }
//   ]
// })
Blog.belongsTo(User, {

  // 创建外键 Blog.userId => User.id
  foreignKey: 'userId'
});

// 一对多
// 连表查询：定义下面的方法原因同上，为了执行主表连带从表的查询
User.hasMany(Blog, {

  // 创建外键 Blog.userId => User.id
  foreignKey: 'userId'
});

module.exports = {
  User,
  Blog
};