/**
 * @description 数据格式化
 */
const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../conf/constant');
const { timeFormat } = require('../utils/date');

/**
 * 用户默认头像
 * @param {Object} obj 用户对象
 */
function _formatUserPicture(obj) {
  if (!obj.picture) { 
    obj.picture = DEFAULT_PICTURE;
  }
  return obj;
}

/**
 * 格式化博客时间
 * @param {Object} obj 数据
 * @returns 
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt);
  obj.updatedAtFormat = timeFormat(obj.updatedAt);
  return obj;
}

/**
 * 格式化博客内容
 * @param {Object} obj 博客数据对象
 * @returns 
 */
function _formatContent(obj) {
  obj.contentFormat = obj.content;

  // 格式化 @
  // 将@内容变成链接<a></a>
  // from '哈喽 @张三 - zhangsan 你好'
  // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      return `<a href="/profile/${userName}">@${nickName}</a>`;
    }
  );
  return obj;
}

/**
 * 格式化博客信息
 * @param {Array|Object} list 博客列表或单个博客对象
 * @returns 
 */
function formatBlog(list) {
  if (list === null) {
    return list;
  }

  // 数组
  if (list instanceof Array) {
    return list.map(_formatDBTime).map(_formatContent);
  }

  // 对象
  let res = list;
  res = _formatDBTime(res);
  res = _formatContent(res);
  return res;
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或单个用户对象
 */
function formatUser(list) {
  if (!list) {
    return list;
  }
  if (Array.isArray(list)) {

    // 数组，用户列表
    return list.map(_formatUserPicture);
  }
  
  // 单个用户
  return _formatUserPicture(list);
}

module.exports = {
  formatUser,
  formatBlog
};