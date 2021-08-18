const Router = require("koa-router");

const { register, login, getUserList, changeUserAvailable, getAutoLogin } = require("../controllers/user");

const router = new Router();

router.post("/v1/user/register", register);

router.post("/v1/user/login", login);

router.get("/v1/userList", getUserList);

router.put("/v1/user/available", changeUserAvailable);

router.get("/v1/user/autoLogin", getAutoLogin);

module.exports = router;
