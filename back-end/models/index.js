const Sequelize = require("sequelize");
const { DATABASE } = require("../config");
const fs = require("fs");

const sequelize = new Sequelize(DATABASE.dbname, DATABASE.username, DATABASE.password, { ...DATABASE.config });

const db = {};

fs.readdirSync(__dirname).forEach((file) => {
  if (file.indexOf("index") < 0) {
    db[file.split(".")[0]] = require(`./${file}`)(sequelize);
  }
});

db.User.hasMany(db.Article, { foreignKey: "userId", onDelete: 'cascade' });
db.Article.belongsTo(db.User, { foreignKey: "userId", onDelete: 'cascade' });

db.Article.hasMany(db.Tag, { foreignKey: "articleId", onDelete: 'cascade' });
db.Tag.belongsTo(db.Article, { foreignKey: "articleId", onDelete: 'cascade' });

db.Article.hasMany(db.Category, { foreignKey: "articleId", onDelete: 'cascade' });
db.Category.belongsTo(db.Article, { foreignKey: "articleId", onDelete: 'cascade' });

db.User.hasMany(db.Comment, { foreignKey: "userId", onDelete: 'cascade' });
db.Comment.belongsTo(db.User, { foreignKey: "userId", onDelete: 'cascade' });

db.Article.hasMany(db.Comment, { foreignKey: "articleId", onDelete: 'cascade' });
db.Comment.belongsTo(db.Article, { foreignKey: "articleId", onDelete: 'cascade' });

db.Comment.hasMany(db.Reply, { foreignKey: "commentId", onDelete: 'cascade' });
db.Reply.belongsTo(db.Comment, { foreignKey: "commentId", onDelete: 'cascade' });

db.User.hasMany(db.Reply, { foreignKey: "fromUserId", onDelete: 'cascade' });
db.Reply.belongsTo(db.User, { foreignKey: "fromUserId", onDelete: 'cascade' });

db.User.hasMany(db.Reply, { foreignKey: "toUserId", onDelete: 'cascade' });
db.Reply.belongsTo(db.User, { foreignKey: "toUserId", onDelete: 'cascade' });

db.Reply.hasMany(db.Reply, { foreignKey: "replyId", onDelete: 'cascade' });
db.Reply.belongsTo(db.Reply, { foreignKey: "replyId", onDelete: 'cascade' });

db.sequelize = sequelize;

module.exports = db;
