"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class levels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      levels.hasMany(models.questions, { foreignKey: "level_id" });
    }
  }
  levels.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "levels",
      tableName: "levels",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      updatedAt: "updated_at",
      paranoid: true,
    }
  );
  return levels;
};
