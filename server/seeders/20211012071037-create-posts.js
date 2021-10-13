"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          posts_id: 1,
          content: "오늘은 총균쇠 50p 를 읽었어요",
          image: null,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1252",
          habits_id: 1,
          userhabits_id: 4,
        },
        {
          posts_id: 2,
          content: "카페에서 독서했어요",
          image: null,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1250",
          habits_id: 1,
          userhabits_id: 2,
        },
        {
          posts_id: 3,
          content: "오늘은 보고싶었던 책을 샀어요",
          image: null,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1249",
          habits_id: 1,
          userhabits_id: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
