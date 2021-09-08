const Joi = require("joi");
const { paramVerify } = require("../utils/index");
const { sequelize } = require("../models");
const { HTTPCODE } = require("../config");
const moment = require("moment");

const addComment = async (ctx) => {
  var schema = Joi.object({
    userId: Joi.number().required(),
    articleId: Joi.number().required(),
    content: Joi.string().required(),
  })
  var isVerified = paramVerify(ctx, schema);
  if (isVerified) {
    const insertCommentSQL = `INSERT INTO comment(content,createdAt,updatedAt,userId,articleId) VALUES ('${ctx.request.body.content}','${moment().format("YYYY-MM-DD hh:mm:ss")}','${moment().format("YYYY-MM-DD hh:mm:ss")}',${ctx.request.body.userId},${ctx.request.body.articleId});`;
    try {
      await sequelize.transaction(async (transaction) => {
        await sequelize.query(insertCommentSQL, {
          transaction: transaction,
        })
      })
      ctx.status = 200;
      ctx.body = {
        code: HTTPCODE.SUCCESS
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
}

const deleteComment = async (ctx) => {
  var schema = Joi.object({
    commentId: Joi.number().required(),
  })
  var isVerified = paramVerify(ctx, schema);
  if (isVerified) {
    const searchCommentSQL = `SELECT * FROM comment WHERE id=${ctx.request.query.commentId};`;

    const deleteCommentSQL = `DELETE FROM comment WHERE id=${ctx.request.query.commentId};`;

    try {
      const [results] = await sequelize.query(searchCommentSQL);
      if (results.length < 1) {
        ctx.status = 200;
        ctx.body = {
          code: HTTPCODE.WRONG_PARAM,
          msg: "评论不存在"
        }
      } else {
        await sequelize.transaction(async (transaction) => {
          await sequelize.query(deleteCommentSQL, {
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
}

const getCommentList = async (ctx) => {
  var schema = Joi.object({
    currentPage: Joi.number().required(),
    articleId: Joi.number().required(),
  })
  var isVerified = paramVerify(ctx, schema);
  if (isVerified) {
    const pageSize = 10;
    const getCommentNumberSQL = `SELECT COUNT(*) AS count FROM comment WHERE articleId=${ctx.request.query.articleId}`
    const getCommentListSQL = `SELECT comment.id as id,comment.userId AS userId,user.username AS username,comment.content AS content,comment.createdAt AS time FROM comment INNER JOIN user ON comment.userId=user.id WHERE comment.articleId=${ctx.request.query.articleId} LIMIT ${pageSize} OFFSET ${(ctx.request.query.currentPage - 1) * pageSize};`;
    try {
      var [countResult] = await sequelize.query(getCommentNumberSQL);
      var totalElements = countResult[0].count;
      var totalPages = Math.ceil(totalElements / pageSize);
      var currentPage = parseInt(ctx.request.query.currentPage);
      var [commentList] = await sequelize.query(getCommentListSQL);
      ctx.status = 200;
      ctx.body = {
        code: HTTPCODE.SUCCESS,
        data: {
          commentList,
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
}

module.exports = {
  addComment,
  deleteComment,
  getCommentList,
}