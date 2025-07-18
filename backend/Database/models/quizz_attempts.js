"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class quiz_attempts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      quiz_attempts.belongsTo(models.users, { foreignKey: "user_id" });
      quiz_attempts.hasMany(models.answers, { foreignKey: "attempt_id" });
      quiz_attempts.hasOne(models.results, { foreignKey: "attempt_id" });
    }
  }
  quiz_attempts.init(
    {
      user_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      level_id: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM("in_progress", "completed"),
        defaultValue: "in_progress",
      },
      completed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "quiz_attempts",
      tableName: "quiz_attempts",
      createdAt: "started_at",
      deletedAt: "deleted_at",
      updatedAt: "updated_at",
      paranoid: true,
    }
  );
  return quiz_attempts;
};
