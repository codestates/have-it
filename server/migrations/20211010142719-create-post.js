"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("posts", {
      posts_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      users_id: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: "users",
            schema: "",
          },
          key: "users_id",
        },
        allowNull: false,
      },
      habits_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "habits",
            schema: "",
          },
          key: "habits_id",
        },
        allowNull: false,
      },
      userhabit_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "userhabits",
            schema: "",
          },
          key: "userhabit_id",
        },
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("posts");
  },
};
