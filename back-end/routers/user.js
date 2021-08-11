const Router = require("koa-router");

const { register, login } = require("../controllers/user");

const router = new Router();

router.post("/user/register", register);

router.post("/user/login", login);

module.exports = router;
