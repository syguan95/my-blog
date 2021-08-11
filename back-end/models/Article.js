const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  console.log("table article defined");

  const Article = sequelize.define(
    "article",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, //主键
        autoIncrement: true, //自增
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      viewCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
    }
  );
  // Article.associate = (models) => {
  //   Article.belongsTo(models.user, { foreignKey: "userId" });
  // };

  // Article.sync();
  return Article;
};
