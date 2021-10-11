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
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      goal: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      habit_day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      actual_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      target_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      achievement: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
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
    }
  );
  return Userhabit;
};
