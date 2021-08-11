const Joi = require("joi");
const bcrypt = require("bcrypt");
const { paramVerify } = require("../utils/index");
const { sequelize } = require("../models");
const { HTTPCODE } = require("../config");
const { getToken } = require("../utils/token");

const register = async (ctx) => {
  var schema = Joi.object({
    username: Joi.string().min(5).max(20).required(),
    password: Joi.string().min(10).max(15).pattern(new RegExp("^[0-9a-zA-Z]{10,15}$")).required(),
  });

  var isVerified = paramVerify(ctx, schema);

  if (isVerified) {
    const salt = await bcrypt.genSalt();
    const passwordEncoded = await bcrypt.hash(ctx.request.body.password, salt);

    const searchUserSQL = `SELECT * FROM user WHERE username='${ctx.request.body.username}';`;

    const createUserSQL = `INSERT INTO user(username,password,role,available) VALUES ('${ctx.request.body.username}','${passwordEncoded}',1,1);`;

    try {
      const [results, matadata] = await sequelize.query(searchUserSQL);
      if (results.length > 0) {
        ctx.status = 200;
        ctx.body = {
          code: HTTPCODE.WRONG_PARAM,
          msg: "用户名已存在",
        };
      } else {
        await sequelize.query(createUserSQL);
        ctx.status = 200;
        ctx.body = {
          code: HTTPCODE.SUCCESS,
        };
      }
    } catch (error) {
      ctx.status = 200;
      ctx.body = {
        code: HTTPCODE.DATABASE_FAIL,
        msg: "数据库操作失败",
      };
    }
  }
};

const login = async (ctx) => {
  var schema = Joi.object({
    username: Joi.string().min(5).max(20).required().error(new Error("用户名错误")),
    password: Joi.string().min(10).max(15).pattern(new RegExp("^[0-9a-zA-Z]{10,15}$")).required().error(new Error("密码错误")),
  });

  var isVerified = paramVerify(ctx, schema);

  if (isVerified) {
    const searchUserSQL = `SELECT * FROM user WHERE username='${ctx.request.body.username}';`;

    try {
      const [results, matadata] = await sequelize.query(searchUserSQL);
      if (results.length <= 0) {
        ctx.status = 200;
        ctx.body = {
          code: HTTPCODE.WRONG_PARAM,
          msg: "用户名不存在",
        };
      } else {
        if (await bcrypt.compare(ctx.request.body.password, results[0].password)) {
          var token = getToken({
            userId: results[0].id,
            role: results[0].role,
          });
          ctx.status = 200;
          ctx.body = {
            code: HTTPCODE.SUCCESS,
            data: {
              username: results[0].username,
              role: results[0].role,
              token: "Bearer " + token,
            },
          };
        } else {
          ctx.status = 200;
          ctx.body = {
            code: HTTPCODE.WRONG_PARAM,
            msg: "密码错误",
          };
        }
      }
    } catch (error) {
      ctx.status = 200;
      ctx.body = {
        code: HTTPCODE.DATABASE_FAIL,
        msg: "查询数据库失败",
      };
    }
  }
};

module.exports = {
  register,
  login,
};
