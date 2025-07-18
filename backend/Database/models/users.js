"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.quiz_attempts, { foreignKey: "user_id" });
      users.hasMany(models.answers, { foreignKey: "user_id" });
      users.hasMany(models.results, { foreignKey: "user_id" });
      users.hasMany(models.leaderboard, { foreignKey: "user_id" });
    }
  }
  users.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("student", "admin"),
        defaultValue: "student",
      },
      phone: DataTypes.INTEGER,
      image:DataTypes.STRING
    },
    {
      sequelize,
      modelName: "users",
      tableName: "users",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      updatedAt: "updated_at",
      paranoid: true,
    }
  );
  return users;
};
