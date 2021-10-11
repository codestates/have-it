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
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sns: {
        type: Sequelize.STRING,
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
