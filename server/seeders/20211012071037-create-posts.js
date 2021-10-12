"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          posts_id: 1,
          content: "음 존맛탱",
          image:
            "https://cdn.discordapp.com/attachments/889931349148975177/897382237069246474/unknown.png",
          users_id: "e8023291-7809-46d0-9afd-f29d561d1252",
          habits_id: 1,
          userhabits_id: 4,
        },
        {
          posts_id: 2,
          content: "채식 반대합니다",
          image: "",
          users_id: "e8023291-7809-46d0-9afd-f29d561d1250",
          habits_id: 1,
          userhabits_id: 2,
        },
        {
          posts_id: 3,
          content: "음 존맛탱",
          image:
            "https://discord.com/channels/889931348469485619/889931349148975177/897382651189669899",
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
