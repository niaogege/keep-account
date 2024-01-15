// controller/user.js
"use strict";
const Controller = require("egg").Controller;
const fs = require("fs");
const moment = require("moment");
const mkdirp = require("mkdirp");
const path = require("path");
class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    let uploadDir = "";
    try {
      const f = fs.readFileSync(file.filepath);
      const day = moment(new Date()).format("YYYYMMDD");
      // 创建保存图片的路径
      console.log(this.config.uploadDir, "this.config.uploadDir");
      const dir = path.join(this.config.uploadDir, day);
      const date = Date.now();
      // 不存在就创建目录
      // await mkdirp(dir);
      await mkdirp.mkdirp(dir);
      // 返回图片保存的路径
      uploadDir = path.join(dir, date + path.extname(file.filename));
      // 写入
      fs.writeFileSync(uploadDir, f);
    } catch (e) {
      ctx.body = {
        code: 500,
        msg: "uplaod failed",
        data: null,
      };
      console.log(e, "upload error");
    } finally {
      // 清除临时文件
      ctx.cleanupRequestFiles();
    }
    ctx.body = {
      code: 200,
      msg: "upload success",
      data: uploadDir.replace(/app/g, ""),
    };
  }
}
module.exports = UploadController;
