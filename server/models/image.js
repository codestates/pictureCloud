"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.image.hasOne(models.board, {
        foreignKey: "id",
      });
      models.image.hasOne(models.user, {
        foreignKey: "id",
      });
    }
  }
  image.init(
    {
      userId: DataTypes.INTEGER,
      boardId: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "image",
    },
  );
  return image;
};
