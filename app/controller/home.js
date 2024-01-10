const { Controller } = require("egg");

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const { id } = ctx.query;
    // ctx.body = "hi, egg cpp" + id;
    // ctx.render 默认会去 view 文件夹寻找 index.html，这是 Egg 约定好的。
    await ctx.render("index.html", {
      title: "cpp - mwh", // 将 title 传入 index.html
    });
  }
  async getName() {
    const { ctx } = this;
    ctx.body = "This is wmh";
  }
  // 获取用户信息
  async user() {
    const { ctx } = this;
    const { id } = ctx.params;
    ctx.body = "id::" + id;
  }
  async user1() {
    const { ctx } = this;
    const res = await ctx.service.home.user();
    ctx.body = res;
  }
  // add
  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body;
    console.log(title, "title");
    ctx.body = { title };
  }
  async addUser() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    try {
      const res = await ctx.service.home.addUser(name);
      ctx.body = {
        code: 200,
        msg: "success",
        data: res,
      };
    } catch (e) {
      ctx.body = {
        code: 500,
        msg: "添加失败",
        data: null,
      };
    }
  }
  // edit
  async editUser() {
    const { ctx } = this;
    const { name, id } = ctx.request.body;
    try {
      const res = await ctx.service.home.editUser(id, name);
      console.log(res, "edit");
      ctx.body = {
        code: 200,
        msg: "success",
        data: null,
      };
    } catch (e) {
      ctx.body = {
        code: 500,
        msg: "编辑失败",
        data: null,
      };
    }
  }
  // delete
  async deleteUser() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const res = await ctx.service.home.deleteUser(id);
      ctx.body = {
        code: 200,
        msg: "success",
        data: null,
      };
    } catch (e) {
      ctx.body = {
        code: 500,
        msg: "delete失败",
        data: null,
      };
    }
  }
}

module.exports = HomeController;
