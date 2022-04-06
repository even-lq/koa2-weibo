/**
 * @description sequelize同步数据库
 */

const seq = require('./seq');

require('./model/index');

// 测试连接
seq.authenticate().then(() => console.log('ok')).catch(() => console.log('err'));

seq.sync({ force: true }).then(() => {
  console.log('sync ok');
  process.exit();
}).catch((e) => {
  console.error(e);
  console.log('sync fail');
  process.exit();
});