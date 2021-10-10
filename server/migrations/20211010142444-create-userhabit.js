"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("userhabits", {
      userhabit_id: {
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
    await queryInterface.dropTable("userhabits");
  },
};
