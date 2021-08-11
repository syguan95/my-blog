const Sequellize = require("sequelize");
const { DATABASE } = require("../config");
const fs = require("fs");

const sequelize = new Sequellize(DATABASE.dbname, DATABASE.username, DATABASE.password, { ...DATABASE.config });

const db = {};

fs.readdirSync(__dirname).forEach((file) => {
  if (file.indexOf("index") < 0) {
    db[file.split(".")[0]] = require(`./${file}`)(sequelize);
  }
});

db.User.hasMany(db.Article, { foreignKey: "userId", onDelete: 'cascade' });
db.Article.belongsTo(db.User);

db.Article.hasMany(db.Tag, { foreignKey: "articleId", onDelete: 'cascade' });
db.Tag.belongsTo(db.Article);

db.Article.hasMany(db.Category, { foreignKey: "articleId", onDelete: 'cascade' });
db.Category.belongsTo(db.Article);

db.sequelize = sequelize;

module.exports = db;
