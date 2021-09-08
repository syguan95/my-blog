const Joi = require("joi");
const { paramVerify } = require("../utils/index");
const { sequelize } = require("../models");
const { HTTPCODE } = require("../config");
const moment = require("moment");

const addReply = async (ctx) => {
  var schema = Joi.object({
    fromUserId: Joi.number().required(),
    toUserId: Joi.number().required(),
    commentId: Joi.number().required(),
    content: Joi.string().required(),
    replyId: Joi.number(),
  })
  var isVerified = paramVerify(ctx, schema);
  if (isVerified) {
    const insertReplySQL = `INSERT INTO reply(content,createdAt,updatedAt,commentId,fromUserId,toUserId,replyId) VALUES ('${ctx.request.body.content}','${moment().format("YYYY-MM-DD hh:mm:ss")}','${moment().format("YYYY-MM-DD hh:mm:ss")}',${ctx.request.body.commentId},${ctx.request.body.fromUserId},${ctx.request.body.toUserId},${ctx.request.body.replyId ? ctx.request.body.replyId : null});`;
    try {
      await sequelize.transaction(async (transaction) => {
        await sequelize.query(insertReplySQL, {
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

const deleteReply = async (ctx) => {
  var schema = Joi.object({
    replyId: Joi.number().required(),
  })
  var isVerified = paramVerify(ctx, schema);
  if (isVerified) {
    const searchReplySQL = `SELECT * FROM reply WHERE id=${ctx.request.query.replyId};`;

    const deleteReplySQL = `DELETE FROM reply WHERE id=${ctx.request.query.replyId};`;

    try {
      const [results] = await sequelize.query(searchReplySQL);
      if (results.length < 1) {
        ctx.status = 200;
        ctx.body = {
          code: HTTPCODE.WRONG_PARAM,
          msg: "回复不存在"
        }
      } else {
        await sequelize.transaction(async (transaction) => {
          await sequelize.query(deleteReplySQL, {
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

const getReplyList = async (ctx) => {
  var schema = Joi.object({
    commentId: Joi.number().required(),
  })
  var isVerified = paramVerify(ctx, schema);
  if (isVerified) {
    const getReplyListSQL = `SELECT reply1.id AS id,reply1.commentId AS commentId,reply1.content AS content,reply1.createdAt AS time,reply1.fromUserId AS fromUserId,user1.username AS fromUsername,reply1.toUserId AS toUserId,user2.username AS toUsername,reply1.replyId AS refReplyId,reply2.content AS refReplyContent FROM user AS user1 INNER JOIN reply AS reply1 INNER JOIN user AS user2 ON user1.id=reply1.fromUserId AND user2.id=reply1.toUserId LEFT JOIN reply AS reply2 ON reply2.id=reply1.replyId WHERE reply1.commentId=${ctx.request.query.commentId} ORDER BY time ;`;
    try {
      var [replyList] = await sequelize.query(getReplyListSQL);
      ctx.status = 200;
      ctx.body = {
        code: HTTPCODE.SUCCESS,
        data: {
          replyList,
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
  addReply,
  deleteReply,
  getReplyList,
}