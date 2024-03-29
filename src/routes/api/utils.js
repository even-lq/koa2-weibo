/**
 * @description utils api 路由
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middlewares/loginChecks');
const koaFrom = require('formidable-upload-koa');
const { 
  saveFile 
} = require('../../controller/utils');

router.prefix('/api/utils');

// 上传图片
router.post(
  '/upload',
  loginCheck,
  koaFrom(),
  async (ctx, next) => {
    const file = ctx.req.files['file'];
    if (!file) {
      return;
    }
    const { size, path, name, type } = file;

    // controller
    // console.log('path', path);
    ctx.body = await saveFile({size, filePath: path, name, type});
  });

module.exports = router;