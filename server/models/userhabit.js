"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Userhabit extends Model {
    static associate(models) {
      models.Userhabit.hasMany(models.Post, {
        foreignKey: { name: "userhabits_id", allowNull: false },
        targetKey: "userhabits_id",
      });
      models.Userhabit.belongsTo(models.User, {
        foreignKey: "users_id",
        targetKey: "users_id",
        onDelete: "CASCADE",
      });
      models.Userhabit.belongsTo(models.Habit, {
        foreignKey: "habits_id",
        targetKey: "habits_id",
        onDelete: "CASCADE",
      });
    }
  }
  Userhabit.init(
    {
      userhabits_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      goal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      habit_day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      actual_amount: {
        type: Sequelize.DECIMAL(7, 1),
        defaultValue: 0,
        allowNull: false,
      },
      target_amount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      achievement: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, //TODO: 임시 저장
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, //TODO: 임시 저장
        allowNull: false,
      },
      done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Userhabit",
      tableName: "userhabits",
      timestamps: true,
      underscored: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Userhabit;
};
