/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtError(app.config.jwt.secret);
  router.get("/", controller.home.index);
  router.post("/api/user/register", controller.user.register);
  router.post("/api/user/login", controller.user.login);
  router.get("/api/user/test", _jwt, controller.user.test);

  router.get("/api/user/get_userinfo", _jwt, controller.user.getUserInfo);
  router.post("/api/user/edit_userinfo", _jwt, controller.user.editUserInfo);
  router.post("/api/upload", controller.upload.upload);

  // bill 账单 新增 编辑 删除 查找
  router.post("/api/bill/add", _jwt, controller.bill.add);
  router.get("/api/bill/list", _jwt, controller.bill.list);
  router.get("/api/bill/detail", _jwt, controller.bill.detail);
  router.post("/api/bill/update", _jwt, controller.bill.update); // 账单更新
  router.post("/api/bill/delete", _jwt, controller.bill.delete); // 账单更新
};
