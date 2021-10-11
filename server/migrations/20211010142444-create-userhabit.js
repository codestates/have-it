"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("userhabits", {
      userhabit_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      users_id: {
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
      habits_id: {
        type: Sequelize.INTEGER,
        references: {
          onDelete: "CASCADE",
          model: {
            tableName: "habits",
            schema: "",
          },
          key: "habits_id",
        },
        allowNull: false,
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
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("userhabits");
  },
};
