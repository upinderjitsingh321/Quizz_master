"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      options.belongsTo(models.questions, { foreignKey: "question_id" });
      options.hasMany(models.answers, { foreignKey: "selected_option_id" });
    }
  }
  options.init(
    {
      question_id: DataTypes.INTEGER,
      option_text: DataTypes.STRING,
      is_correct: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "options",
      tableName:"options",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      updatedAt: "updated_at",
      paranoid: true,
    }
  );
  return options;
};
