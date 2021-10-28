const Router = require("koa-router");
const config = require("../config/index");

const { addArticle, editArticle, deleteArticle, getArticle, getArticleList, getArticleTags, getArticleCategorys } = require("../controllers/article");

const router = new Router();

router.post(config.API_VERSION + "/article", addArticle);

router.put(config.API_VERSION + "/article", editArticle);

router.delete(config.API_VERSION + "/article", deleteArticle);

router.get(config.API_VERSION + "/article", getArticle);

router.get(config.API_VERSION + "/articleList", getArticleList);

router.get(config.API_VERSION + "/articleTags", getArticleTags);

router.get(config.API_VERSION + "/articleCategorys", getArticleCategorys);

module.exports = router;
