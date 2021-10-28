const Router = require("koa-router");
const config = require("../config/index");

const { addReply, deleteReply, getReplyList } = require("../controllers/reply");

const router = new Router();

router.post(config.API_VERSION + "/reply", addReply);
router.delete(config.API_VERSION + "/reply", deleteReply);
router.get(config.API_VERSION + "/reply", getReplyList);

module.exports = router;