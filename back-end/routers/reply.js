const Router = require("koa-router");
const { addReply, deleteReply, getReplyList } = require("../controllers/reply");

const router = new Router();

router.post("/v1/reply", addReply);
router.delete("/v1/reply", deleteReply);
router.get("/v1/reply", getReplyList);

module.exports = router;