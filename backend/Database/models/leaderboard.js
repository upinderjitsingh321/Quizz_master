"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class leaderboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      leaderboard.belongsTo(models.users, { foreignKey: "user_id" });
    }
  }
  leaderboard.init(
    {
      user_id: { type: DataTypes.INTEGER, unique: true },
      total_score: DataTypes.INTEGER,
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "leaderboard",
      tableName: "leaderboard",
      createdAt: "created_at",
      deletedAt: "deleted_at",
      updatedAt: "updated_at",
      paranoid: true,
    }
  );
  return leaderboard;
};
