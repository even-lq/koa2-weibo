/**
 * @description json schema 验证中间件
 */

const { ErrorModel } = require('../model/ResModel');
const { jsonSchemaFileInfo } = require('../model/ErrorInfo');

/**
 * 生成 json schema 验证的中间件
 * @param {function} validateFn 验证函数
 */
function genValidator(validateFn) {
  async function validator(ctx, next) {

    // 数据校验
    const error = validateFn(ctx.request.body);
    console.log(error);
    if (error) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo);
      return;
    }
    await next();
  }
  return validator;
}

module.exports = {
  genValidator
};