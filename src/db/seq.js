/**
 * @description sequelize实例
 */

const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../conf/db');
const { host, user, password, database } = MYSQL_CONF;
const { isTest, isProd } = require('../utils/env');

const conf = {
  host,
  dialect: 'mysql'
};

// 测试环境下不打印sql语句
if (isTest) {
  conf.logging = () => {};
}

// 线上环境使用连接池
if (isProd) {
  conf.pool = {
    max: 5, // 连接池中最大的连接数量
    min: 0, // 最小
    idle: 10000 // 10s之内没使用则自动释放
  };
}

const seq = new Sequelize(database, user, password, conf);

module.exports = seq;