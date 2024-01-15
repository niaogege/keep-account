"use strict";

const Service = require("egg").Service;

class BillService extends Service {
  // 新增
  async add(params) {
    const { ctx, app } = this;
    try {
      const res = await app.mysql.insert("bill", params);
      return res;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }
  // 查找
  async find(params) {
    const { ctx, app } = this;
    try {
      const res = await app.mysql.insert("bill", params);
      return res;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }
  // 编辑
  async edit(params) {
    const { ctx, app } = this;
    try {
      const res = await app.mysql.insert("bill", params);
      return res;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }
  // 删除
  async delete(params) {
    const { ctx, app } = this;
    try {
      const res = await app.mysql.insert("bill", params);
      return res;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }
}

module.exports = BillService;
