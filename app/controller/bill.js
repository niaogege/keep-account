"use strict";
const Controller = require("egg").Controller;

class BillController extends Controller {
  // 新增
  async add() {
    const { ctx, app } = this;
    const { amount, type_id, type_name, remark, pay_type, user_id, date } =
      ctx.request.body;
    // 判空处理，这里前端也可以做，但是后端也需要做一层判断。
    if (!amount || !type_id || !type_name || !date || !pay_type) {
      ctx.body = {
        code: 400,
        msg: "参数错误",
        data: null,
      };
    }
    try {
      const token = ctx.request.header.authorization;
      // 通过 app.jwt.verify + 加密字符串 解析出 token 的值
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      const result = await ctx.service.bill.add({
        amount,
        type_id,
        type_name,
        date,
        pay_type,
        remark,
        user_id: decode.id, // 用户id
      });
      console.log(result, "bill add");
      ctx.body = {
        code: 200,
        msg: "request success",
        data: null,
      };
    } catch (e) {
      ctx.body = {
        code: 500,
        msg: "add request failed",
        data: null,
      };
    }
  }
  // 查找

  // 编辑

  // 删除
}
module.exports = BillController;
