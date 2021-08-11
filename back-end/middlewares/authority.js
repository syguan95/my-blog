const { checkToken, getOperation } = require("../utils/token");
const { HTTPCODE } = require("../config");
const { AUTHORITY } = require("../config");

module.exports = async (ctx, next) => {
  if (ctx.request.url.indexOf("register") > -1 || ctx.request.url.indexOf("login") > -1 || ctx.request.url.indexOf("article") > -1 && ctx.request.method === "GET") {  //注册和登录接口不需要验证权限
    await next();
  } else {
    var token = ctx.request.headers.authorization;
    if (!token) {     //heads.authorization中不含token，提示用户未登录
      ctx.status = 200;
      ctx.body = {
        code: HTTPCODE.UNLOGIN,
        msg: "未登录",
      };
    } else {
      try {
        var payload = checkToken(token);
        var operations = AUTHORITY[payload.role];
        var currentOperation = getOperation(ctx.request.url, ctx.request.method);
        if (!operations.includes(currentOperation)) {     //当前用户不具备该接口的调用权限
          ctx.status = 200;
          ctx.body = {
            code: HTTPCODE.UNAUTHORIZED,
            msg: "无权限",
          };
        } else {
          await next();
        }
      } catch (error) {
        ctx.status = 200;   //token过期，需要重新登录
        ctx.body = {
          code: HTTPCODE.UNLOGIN,
          msg: "未登录",
        };
      }
    }
  }
};
