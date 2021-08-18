const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/v1", {
      target: "http://localhost:8888",
      changeOrigin: true,
      // pathRewrite: {
      //   "^/api": ""
      // }
    })
  )
}