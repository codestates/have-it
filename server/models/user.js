"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Habit, {
        foreignKey: "creator_id",
        sourceKey: "users_id",
      });
      models.User.hasMany(models.Post, {
        foreignKey: "users_id",
        sourceKey: "users_id",
      });
      models.User.hasMany(models.Userhabit, {
        foreignKey: "users_id",
        sourceKey: "users_id",
      });
    }
  }
  User.init(
    {
      users_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(15),
      },
      email: {
        type: Sequelize.STRING(40),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nickname: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      bio: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sns: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      underscored: true,
      charset: "utf8",
    }
  );
  return User;
};
