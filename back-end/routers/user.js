const Router = require("koa-router");
const config = require("../config/index");

const { register, login, getUserList, changeUserAvailable, getAutoLogin } = require("../controllers/user");

const router = new Router();

router.post(config.API_VERSION + "/user/register", register);

router.post(config.API_VERSION + "/user/login", login);

router.get(config.API_VERSION + "/userList", getUserList);

router.put(config.API_VERSION + "/user/available", changeUserAvailable);

router.get(config.API_VERSION + "/user/autoLogin", getAutoLogin);

module.exports = router;
