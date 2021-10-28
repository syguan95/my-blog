const Router = require("koa-router");
const config = require("../config/index");

const { addComment, deleteComment, getCommentList } = require("../controllers/comment");

const router = new Router();

router.post(config.API_VERSION + "/comment", addComment);
router.delete(config.API_VERSION + "/comment", deleteComment);
router.get(config.API_VERSION + "/comment", getCommentList);

module.exports = router;