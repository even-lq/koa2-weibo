/**
 * @description 用户关注关系模型
 */

const seq = require('../seq');
const { INTEGER } = require('../types');

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '该用户关注的用户的ID'
  }
});

module.exports = UserRelation;