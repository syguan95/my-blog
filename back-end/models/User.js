const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  console.log("table user defined");
  const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true, //主键
        autoIncrement: true, //自增
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      available: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {}
  );

  // User.associate = (models) => {
  //   console.log("TEST",models)
  //   User.hasMany(models.article);
  // };

  return User;
};
