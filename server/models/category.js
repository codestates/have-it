"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      models.Category.hasMany(models.Habit, {
        foreignKey: { name: "categories_id", allowNull: false },
        sourceKey: "categories_id",
      });
    }
  }
  Category.init(
    {
      categories_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      en_title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      level1image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      level2image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      level3image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      timestamps: false,
      underscored: true,
      charset: "utf8",
    }
  );
  return Category;
};
