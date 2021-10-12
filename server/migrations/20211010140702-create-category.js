"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("categories", {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("categories");
  },
};
