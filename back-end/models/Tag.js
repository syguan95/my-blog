const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  console.log("table tag defined");
  const Tag = sequelize.define(
    "tag",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, //主键
        autoIncrement: true, //自增
      },
      tagname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {}
  );

  return Tag;
};
