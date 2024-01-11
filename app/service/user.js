//  service/user.js
"use strict";

const Service = require("egg").Service;

class UserService extends Service {
  async getUserByName(username) {
    const { app } = this;
    try {
      const res = await app.mysql.get("user", { username });
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async editUserInfo(params) {
    const { app } = this;
    try {
      const res = await app.mysql.update(
        "user",
        { ...params },
        {
          id: params.id, // 筛选出 id 等于 params.id 的用户
        }
      );
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async register(params) {
    const { app } = this;
    try {
      const res = await app.mysql.insert("user", params);
      return res;
    } catch (e) {
      console.warn(e);
      return null;
    }
  }
}

module.exports = UserService;
