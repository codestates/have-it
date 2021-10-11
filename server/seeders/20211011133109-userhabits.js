"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("userhabits", []);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("userhabits", null, {});
  },
};
