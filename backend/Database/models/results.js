"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class results extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      results.belongsTo(models.users, { foreignKey: "user_id" });
      results.belongsTo(models.quiz_attempts, { foreignKey: "attempt_id" });
    }
  }
  results.init(
    {
      user_id: DataTypes.INTEGER,
      attempt_id: { type: DataTypes.INTEGER, unique: true },
      score: DataTypes.INTEGER,
      total_questions: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "results",
      tableName: "results",
      createdAt: "taken_at",
      deletedAt: "deleted_at",
      updatedAt: "updated_at",
      paranoid: true,
    }
  );
  return results;
};
