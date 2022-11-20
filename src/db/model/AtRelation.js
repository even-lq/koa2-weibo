/**
 * @description @用户关系，数据模型
 */

const seq = require('../seq');
const {
  INTEGER,
  BOOLEAN
} = require('../types');

const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '微博Id'
  },
  isRead: {
    type: INTEGER,
    allowNull: false,
    defaultValue: false,
    comment: '是否已读'
  }
});

module.exports = AtRelation;