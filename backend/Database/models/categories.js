"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categories.hasMany(models.questions, { foreignKey: "category_id" });
    }
  }
  categories.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "categories",
      tableName: "categories",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      updatedAt: "updated_at",
      paranoid: true,
    }
  );
  return categories;
};
