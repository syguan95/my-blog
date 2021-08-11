const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  console.log("table category defined");
  const Category = sequelize.define(
    "category",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, //主键
        autoIncrement: true, //自增
      },
      categoryname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {}
  );

  return Category;
};
