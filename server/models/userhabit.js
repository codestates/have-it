"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Userhabit extends Model {
    static associate(models) {
      models.Userhabit.hasMany(models.Post, {
        foreignKey: "userhabit_id",
        targetKey: "userhabit_id",
      });
      models.Userhabit.belongsTo(models.User, {
        foreignKey: "users_id",
        targetKey: "users_id",
      });
      models.Userhabit.belongsTo(models.Habit, {
        foreignKey: "habits_id",
        targetKey: "habits_id",
      });
    }
  }
  Userhabit.init(
    {
      userhabit_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      goal: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      habit_day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start_day: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_day: {
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
