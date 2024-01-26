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

  // list
  async list(id) {
    const { ctx, app } = this;
    const QUERY_STR = "id,pay_type,amount,date,type_id,type_name,remark";
    const sql = `select ${QUERY_STR} from bill where user_id=${id}`;
    try {
      const res = await app.mysql.query(sql);
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  // 详情
  async detail(id, user_id) {
    const { ctx, app } = this;
    try {
      const res = await app.mysql.get("bill", { id, user_id });
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  // 编辑
  async update(param) {
    const { ctx, app } = this;
    try {
      const res = await app.mysql.update(
        "bill",
        {
          ...param,
        },
        { id: param.id, user_id: param.user_id }
      );
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  // delete
  async delete(id, user_id) {
    const { ctx, app } = this;
    try {
      const res = await app.mysql.delete("bill", {
        id,
        user_id,
      });
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = BillService;
