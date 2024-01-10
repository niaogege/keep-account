const Service = require("egg").Service;

class HomeService extends Service {
  async user() {
    const { ctx, app } = this;
    const QUERY_STR = "id, name";
    // 获取 id 的 sql 语句
    const sql = `select ${QUERY_STR} from list`;
    try {
      // mysql 实例已经挂载到 app 对象下，可以通过 app.mysql 获取到。
      const res = await app.mysql.query(sql);
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
    // // 假设从数据库获取的用户信息
    // return {
    //   name: "嘎子",
    //   slogen: "网络的世界太虚拟,你把握不住",
    // };
  }
  async addUser(name) {
    const { ctx, app } = this;
    try {
      const res = await app.mysql.insert("list", { name });
      return res;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  async editUser(id, name) {
    const { ctx, app } = this;
    try {
      const res = await app.mysql.update(
        "list",
        { name },
        {
          where: {
            id,
          },
        }
      );
      return res;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  async deleteUser(id) {
    const { ctx, app } = this;
    try {
      const res = await app.mysql.delete("list", { id });
      return res;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
module.exports = HomeService;
