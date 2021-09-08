const Router = require("koa-router");
const { addComment, deleteComment, getCommentList } = require("../controllers/comment");

const router = new Router();

router.post("/v1/comment", addComment);
router.delete("/v1/comment", deleteComment);
router.get("/v1/comment", getCommentList);

module.exports = router;