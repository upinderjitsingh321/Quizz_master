"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      answers.belongsTo(models.users, { foreignKey: "user_id" });
      answers.belongsTo(models.questions, { foreignKey: "question_id" });
      answers.belongsTo(models.options, { foreignKey: "selected_option_id" });
      answers.belongsTo(models.quiz_attempts, { foreignKey: "attempt_id", as: 'quiz_attempt'});
    }
  }
  answers.init(
    {
      user_id: DataTypes.INTEGER,
      question_id: DataTypes.INTEGER,
      selected_option_id: DataTypes.INTEGER,
      is_correct: DataTypes.BOOLEAN,
      attempt_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "answers",
      tableName: "answers",
      createdAt: "answered_at",
      deletedAt: "deleted_at",
      updatedAt: "updated_at",
      paranoid: true,
    }
  );
  return answers;
};
