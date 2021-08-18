const Router = require("koa-router");
const { addArticle, editArticle, deleteArticle, getArticle, getArticleList, getArticleTags, getArticleCategorys } = require("../controllers/article");

const router = new Router();

router.post("/v1/article", addArticle);

router.put("/v1/article", editArticle);

router.delete("/v1/article", deleteArticle);

router.get("/v1/article", getArticle);

router.get("/v1/articleList", getArticleList);

router.get("/v1/articleTags", getArticleTags);

router.get("/v1/articleCategorys", getArticleCategorys);

module.exports = router;
