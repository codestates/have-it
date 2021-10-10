"use strict";
const { Model, Sequelize } = require("sequelize");
const habits = require("../controllers/habits");
module.exports = (sequelize, DataTypes) => {
  class Habit extends Model {
    static associate(models) {
      models.Habit.hasMany(models.Post, {
        foreignKey: "habits_id",
        sourceKey: "habits_id",
      });
      models.Habit.belongsTo(models.User, {
        foreignKey: "creator_id",
        targetKey: "users_id",
      });
      models.Habit.hasMany(models.Userhabit, {
        foreignKey: "habits_id",
        sourceKey: "habits_id",
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
      category: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      emoji_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
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
