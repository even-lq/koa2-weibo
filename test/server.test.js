/**
 * http测试
 * @description jest server
 */

const request = require('supertest')
const server = require('../src/app').callback()

// 把request(server)当作server并对其发起请求
module.exports = request(server);
