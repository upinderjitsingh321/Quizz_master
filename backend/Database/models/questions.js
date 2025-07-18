"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      questions.belongsTo(models.categories, { foreignKey: "category_id" });
      questions.belongsTo(models.levels, { foreignKey: "level_id" });
      questions.hasMany(models.options, { foreignKey: "question_id" });
      questions.hasMany(models.answers, { foreignKey: "question_id" });
    }
  }
  questions.init(
    {
      question_text: DataTypes.TEXT,
      category_id: DataTypes.INTEGER,
      level_id: DataTypes.INTEGER,
      created_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "questions",
      tableName: "questions",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      updatedAt: "updated_at",
      paranoid: true,
    }
  );
  return questions;
};
