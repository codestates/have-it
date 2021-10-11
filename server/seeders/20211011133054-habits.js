"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("habits", []);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("habits", null, {});
  },
};
