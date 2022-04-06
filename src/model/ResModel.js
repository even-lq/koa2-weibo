/**
 * @description res的数据模型
 */

/**
 * 基础模块
 */
class BaseModel {
  constructor({errno, data, message}) {
    this.errno = errno;
    data && (this.data = data);
    message && (this.message = message);
  }
}

/**
 * 成功模块
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({errno: 0, data});
  }
}

/**
 * 失败模块
 */
class ErrorModel extends BaseModel {
  constructor({errno, message}) {
    super({errno, message});
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
};