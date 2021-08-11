const Joi = require("joi");
const { paramVerify } = require("../utils/index");
const { sequelize } = require("../models");
const { HTTPCODE } = require("../config");
const moment = require("moment");

const addArticle = async (ctx) => {
  var schema = Joi.object({
    title: Joi.string().max(50).required(),
    content: Joi.string().required(),
    tags: Joi.array(),
    categorys: Joi.array(),
    userId: Joi.number().required(),
  });
  var isVerified = paramVerify(ctx, schema);
  if (isVerified) {
    const searchArticleSQL = `SELECT title FROM article WHERE title='${ctx.request.body.title}';`;

    const insertArticleSQL = `INSERT INTO article(title,content,viewCount,userId,createdAt,updatedAt) VALUES ('${ctx.request.body.title}','${ctx.request.body.content}',0,${ctx.request.body.userId},'${moment().format("YYYY-MM-DD hh:mm:ss")}','${moment().format("YYYY-MM-DD hh:mm:ss")}');`;

    var insertTagsSQL = `INSERT INTO tag(tagname,articleId) VALUES `;

    var insertCategorysSQL = `INSERT INTO category(categoryname,articleId) VALUES `;

    try {
      const [results, matadata] = await sequelize.query(searchArticleSQL);
      if (results.length > 0) {
        ctx.status = 200;
        ctx.body = {
          code: HTTPCODE.WRONG_PARAM,
          msg: "该文章标题已存在",
        };
      } else {
        await sequelize.transaction(async (transaction) => {
          const [articleId] = await sequelize.query(insertArticleSQL, {     //插入文章
            transaction: transaction,
          });

          insertTagsSQL = insertTagsSQL + ctx.request.body.tags.map((element) => {
            return `('${element}',${articleId})`;
          }).join(",");

          insertCategorysSQL = insertCategorysSQL + ctx.request.body.categorys.map((element) => {
            return `('${element}',${articleId})`;
          }).join(",");

          await sequelize.query(insertTagsSQL, {  //插入tag
            transaction: transaction,
          });
          await sequelize.query(insertCategorysSQL, {   //插入category
            transaction: transaction,
          });
        });

        ctx.status = 200;
        ctx.body = {
          code: HTTPCODE.SUCCESS,
        };
      }
    } catch (error) {
      console.log(error.message);
      ctx.status = 200;
      ctx.body = {
        code: HTTPCODE.DATABASE_FAIL,
        msg: "数据库操作失败",
      };
    }
  }
};

const editArticle = async (ctx) => {
  var schema = Joi.object({
    title: Joi.string().max(50).required(),
    content: Joi.string().required(),
    tags: Joi.array(),
    categorys: Joi.array(),
    articleId: Joi.number().required(),
  });
  var isVerified = paramVerify(ctx, schema);
  if (isVerified) {
    const searchArticleSQL = `SELECT * FROM article WHERE id=${ctx.request.body.articleId};`;

    const updateArticleSQL = `UPDATE article SET title='${ctx.request.body.title}',content='${ctx.request.body.content}',updatedAt='${moment().format("YYYY-MM-DD hh:mm:ss")}' WHERE id=${ctx.request.body.articleId};`;

    const deleteTagsSQL = `DELETE FROM tag WHERE articleId=${ctx.request.body.articleId};`;

    const deleteCategorysSQL = `DELETE FROM category WHERE articleId=${ctx.request.body.articleId};`;

    var insertTagsSQL = `INSERT INTO tag(tagname,articleId) VALUES `;

    var insertCategorysSQL = `INSERT INTO category(categoryname,articleId) VALUES `;

    try {
      const [results, matadata] = await sequelize.query(searchArticleSQL);
      if (results.length < 1) {
        ctx.status = 200;
        ctx.body = {
          code: HTTPCODE.WRONG_PARAM,
          msg: "文章不存在",
        };
      } else {
        await sequelize.transaction(async (transaction) => {
          await sequelize.query(updateArticleSQL, {
            transaction: transaction,
          });

          await sequelize.query(deleteTagsSQL, {      //tag和category的更新采用全部删除后重新插入的方式
            transaction: transaction,
          });

          await sequelize.query(deleteCategorysSQL, {
            transaction: transaction,
          });

          insertTagsSQL = insertTagsSQL + ctx.request.body.tags.map((element) => {
            return `('${element}',${ctx.request.body.articleId})`;
          }).join(",");

          insertCategorysSQL = insertCategorysSQL + ctx.request.body.categorys.map((element) => {
            return `('${element}',${ctx.request.body.articleId})`;
          }).join(",");

          await sequelize.query(insertTagsSQL, {
            transaction: transaction,
          });
          await sequelize.query(insertCategorysSQL, {
            transaction: transaction,
          });
        });

        ctx.status = 200;
        ctx.body = {
          code: HTTPCODE.SUCCESS,
        };
      }
    } catch (error) {
      console.log(error.message);
      ctx.status = 200;
      ctx.body = {
        code: HTTPCODE.DATABASE_FAIL,
        msg: "数据库操作失败",
      };
    }
  }
};

const deleteArticle = async (ctx) => {
  var schema = Joi.object({
    articleId: Joi.number().required(),
  });
  var isVerified = paramVerify(ctx, schema);
  if (isVerified) {
    const searchArticleSQL = `SELECT * FROM article WHERE id=${ctx.request.query.articleId};`;

    const deleteArticle = `DELETE FROM article WHERE id=${ctx.request.query.articleId};`;

    // const deleteTagsSQL = `DELETE FROM tag WHERE articleId=${ctx.request.query.articleId};`;

    // const deleteCategorysSQL = `DELETE FROM category WHERE articleId=${ctx.request.query.articleId};`;

    try {
      const [results, matadata] = await sequelize.query(searchArticleSQL);
      if (results.length < 1) {
        ctx.status = 200;
        ctx.body = {
          code: HTTPCODE.WRONG_PARAM,
          msg: "文章不存在",
        };
      } else {
        await sequelize.transaction(async (transaction) => {
          await sequelize.query(deleteArticle, {
            transaction: transaction,
          });
          //article对应的标签和类别不需要手动删除，定义表关系时设置了cascade
          // await sequelize.query(deleteTagsSQL, {
          //   transaction: transaction,
          // });

          // await sequelize.query(deleteCategorysSQL, {
          //   transaction: transaction,
          // });
        });

        ctx.status = 200;
        ctx.body = {
          code: HTTPCODE.SUCCESS,
        };
      }
    } catch (error) {
      console.log(error.message);
      ctx.status = 200;
      ctx.body = {
        code: HTTPCODE.DATABASE_FAIL,
        msg: "数据库操作失败",
      };
    }
  }
};

const getArticle = async (ctx) => {
  var schema = Joi.object({
    articleId: Joi.number().required(),
  })
  var isVerified = paramVerify(ctx, schema);
  if (isVerified) {
    const getArticleSQL = `SELECT article.id,article.title,article.content,article.viewCount,article.createdAt,article.updatedAt,user.username,article_tag.tags,article_category.categorys FROM user,article,(SELECT articleId,GROUP_CONCAT(tagname) AS tags FROM tag GROUP BY articleId) AS article_tag,(SELECT articleId,GROUP_CONCAT(categoryname) AS categorys FROM category GROUP BY articleId) AS article_category WHERE article.userId=user.id AND article.id=article_tag.articleId AND article.id=article_category.articleId AND article.id=${ctx.request.query.articleId};`

    try {
      var [result] = await sequelize.query(getArticleSQL)
      if (result.length < 1) {
        ctx.status = 200;
        ctx.body = {
          code: HTTPCODE.WRONG_PARAM,
          msg: "文章不存在",
        };
      } else {
        ctx.status = 200;
        ctx.body = {
          code: HTTPCODE.SUCCESS,
          data: {
            ...result[0],
            tags: result[0].tags.split(","),
            categorys: result[0].categorys.split(","),
          },
        };
      }
    } catch (error) {
      console.log(error.message);
      ctx.status = 200;
      ctx.body = {
        code: HTTPCODE.DATABASE_FAIL,
        msg: "数据库操作失败",
      };
    }
  }
};

const getArticleList = async (ctx) => {
  var schema = Joi.object({
    currentPage: Joi.number().required(),
  });
  var isVerified = paramVerify(ctx, schema);
  if (isVerified) {
    const getArticleNumberSQL = `SELECT COUNT(*) AS count FROM article`;

    const pageSize = 10;

    const getArticleListSQL = `SELECT article.id,article.title,article.content,article.viewCount,article.createdAt,article.updatedAt,user.username,article_tag.tags,article_category.categorys FROM user,article,(SELECT articleId,GROUP_CONCAT(tagname) AS tags FROM tag GROUP BY articleId) AS article_tag,(SELECT articleId,GROUP_CONCAT(categoryname) AS categorys FROM category GROUP BY articleId) AS article_category WHERE article.userId=user.id AND article.id=article_tag.articleId AND article.id=article_category.articleId LIMIT 10 OFFSET ${(ctx.request.query.currentPage - 1) * pageSize};`;

    try {
      var [countResult] = await sequelize.query(getArticleNumberSQL);
      var totalElements=countResult[0].count
      var totalPages = Math.ceil(totalElements / 10);
      var currentPage = parseInt(ctx.request.query.currentPage);
      var [articles] = await sequelize.query(getArticleListSQL);
      ctx.status = 200;
      ctx.body = {
        code: HTTPCODE.SUCCESS,
        data: {
          articles: articles,
          pageSize,
          totalPages,
          totalElements,
          currentPage,
        },
      };
    } catch (error) {
      console.log(error.message);
      ctx.status = 200;
      ctx.body = {
        code: HTTPCODE.DATABASE_FAIL,
        msg: "数据库操作失败",
      };
    }
  }
};

module.exports = {
  addArticle,
  editArticle,
  deleteArticle,
  getArticle,
  getArticleList,
};
