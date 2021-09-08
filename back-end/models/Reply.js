const Sequelize = require("sequelize");

module.exports = (sequelize) => {

  const Reply = sequelize.define(
    "reply",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return Reply;
}