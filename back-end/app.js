const Koa = require("koa2");
const initRoute = require("./routers");
const KoaBody = require("koa-body");
const config = require("./config");
const db = require("./models");
const authority = require("./middlewares/authority");

const app = new Koa();

app.use(KoaBody()).use(authority);

initRoute(app);

app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
  db.sequelize.sync();
});
