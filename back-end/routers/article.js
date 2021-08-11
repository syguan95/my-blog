const Router = require("koa-router");
const { addArticle, editArticle, deleteArticle, getArticle, getArticleList } = require("../controllers/article");

const router = new Router();

router.post("/article", addArticle);

router.put("/article", editArticle);

router.delete("/article", deleteArticle);

router.get("/article", getArticle);

router.get("/articleList", getArticleList);

module.exports = router;
