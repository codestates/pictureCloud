"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.board, {
        foreignKey: "userId",
      });
      models.user.hasMany(models.image, {
        foreignKey: "userId",
      });
      models.user.hasMany(models.comment, {
        foreignKey: "userId",
      });
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    },
  );
  return user;
};
