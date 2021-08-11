const fs = require("fs");

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
      if (file.indexOf("index") < 0) {
        app.use(require(`./${file}`).routes());
      }
    });
};
