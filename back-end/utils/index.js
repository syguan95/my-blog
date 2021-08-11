const { HTTPCODE } = require("../config");
const paramVerify = (ctx, schema) => {
  var { value, error } = schema.validate(ctx.request.method === 'DELETE' || ctx.request.method === 'GET' ? ctx.request.query : ctx.request.body);
  if (error) {
    ctx.status = 200;
    ctx.body = {
      code: HTTPCODE.WRONG_PARAM,
      msg: error.message,
    };
    return false;
  }
  return true;
};

module.exports = {
  paramVerify,
};
