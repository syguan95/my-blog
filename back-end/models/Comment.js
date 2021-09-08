const Sequelize = require("sequelize");

module.exports = (sequelize) => {

  const Comment = sequelize.define(
    "comment",
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

  return Comment;
}