"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: "users_id",
        targetKey: "users_id",
        onDelete: "CASCADE",
      });
      models.Post.belongsTo(models.Habit, {
        foreignKey: "habits_id",
        targetKey: "habits_id",
        onDelete: "CASCADE",
      });
      models.Post.belongsTo(models.Userhabit, {
        foreignKey: "userhabits_id",
        targetKey: "userhabits_id",
        onDelete: "CASCADE",
      });
    }
  }
  Post.init(
    {
      posts_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      timestamps: true,
      underscored: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Post;
};
