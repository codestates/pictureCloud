"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.board.hasOne(models.user, {
        foreignKey: "id",
      });
      models.board.hasMany(models.image, {
        foreignKey: "boardId",
      });
    }
  }
  board.init(
    {
      userId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      hint: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "board",
    },
  );
  return board;
};
