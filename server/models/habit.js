"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Habit extends Model {
    static associate(models) {
      models.Habit.hasMany(models.Post, {
        foreignKey: { name: "habits_id", allowNull: false },
        sourceKey: "habits_id",
      });
      models.Habit.belongsTo(models.User, {
        foreignKey: { name: "creator_id", allowNull: false },
        targetKey: "users_id",
        onDelete: "CASCADE",
      });
      models.Habit.hasMany(models.Userhabit, {
        foreignKey: { name: "habits_id", allowNull: false },
        sourceKey: "habits_id",
      });
      models.Habit.belongsTo(models.Category, {
        foreignKey: "categories_id",
        targetKey: "categories_id",
        onDelete: "CASCADE",
      });
    }
  }
  Habit.init(
    {
      habits_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      user_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emoji_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    },
    {
      sequelize,
      modelName: "Habit",
      tableName: "habits",
      timestamps: false,
      underscored: true,
      charset: "utf8",
    }
  );
  return Habit;
};
