"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("habits", {
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
      categories_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          onDelete: "CASCADE",
          model: {
            tableName: "categories",
            schema: "",
            onDelete: "CASCADE",
          },
          key: "categories_id",
        },
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
      creator_id: {
        type: Sequelize.STRING,
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "users",
            schema: "",
          },
          key: "users_id",
        },
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("habits");
  },
};
