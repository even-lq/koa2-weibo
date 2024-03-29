/**
 * @description 生成html文件工具方法
 */
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// 获取blog-list.ejs的文件内容
const BLOG_LIST_TPL = fs.readFileSync(
  path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString();

/**
 * 根据blogList渲染处html字符串
 * @param {Array} blogList 微博列表
 * @param {boolean} canReply 是否可以回复
 * @returns ejs渲染结果
 */
function getBlogListStr(blogList = [], canReply = false) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  });
}

module.exports = {
  getBlogListStr
};