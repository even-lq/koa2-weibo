const { isProd } = require('../utils/env');

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
};

let MYSQL_CONF = {
  port: '3306',
  host: 'localhost',
  user: 'root',
  password: 'liqing',
  database: 'koa2_weibo'
};

if (isProd) {
  REDIS_CONF = {
    // 线上的 redis 配置
    port: 6379,
    host: '127.0.0.1'
  };

  MYSQL_CONF = {
    // 线上的 mysql 配置
    port: '3306',
    host: 'localhost',
    user: 'root',
    password: 'liqing',
    database: 'koa2_weibo'
  };
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
};