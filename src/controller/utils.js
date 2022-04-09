/**
 * @description utils controller
 */

const fse = require('fs-extra');
const path = require('path');
const { 
  uploadFileSizeFailInfo
} = require('../model/ErrorInfo');
const { SuccessModel, ErrorModel } = require('../model/ResModel');

// 存储目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles');

// 是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist =>{
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH);
  }
});

// 文件最大体积 1M
const MAX_SIZE = 1024 * 1024 * 1024;

/**
 * 保存文件
 * @param {number} size 文件大小
 * @param {string} path 文件路径
 * @param {string} name 文件名
 * @param {string} type 文件类型
 */
async function saveFile({size, filePath, name, type}) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath);
    return ErrorModel(uploadFileSizeFailInfo);
  }

  // 移动文件
  // 防止重名
  const fileName = Date.now() + '.' + name;

  // 文件地址
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName);

  // 移动文件
  await fse.move(filePath, distFilePath);

  // 返回文件信息
  return new SuccessModel({
    url: '/' + fileName
  });
}

module.exports = {
  saveFile
};