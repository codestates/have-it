"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("habits", [
      {
        habits_id: 1,
        user_count: 4,
        categories_id: 5,
        title: "야채를 먹어요",
        description: "하루에 야채를 듬뿍 먹어요",
        image:
          "https://mblogthumb-phinf.pstatic.net/20140731_160/gr22nade_1406769453489G3duA_JPEG/vegetables-155714.jpg?type=w2",
        emoji_id: 1,
        color: "green",
        creator_id: "e8023291-7809-46d0-9afd-f29d561d1252",
      },
      {
        habits_id: 2,
        user_count: 4,
        categories_id: 5,
        title: "고기를 먹어요",
        description: "하루에 고기를 듬뿍 먹어요",
        image:
          "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201702/27/117f5b49-1d09-4550-8ab7-87c0d82614de.jpg",
        emoji_id: 3,
        color: "red",
        creator_id: "e8023291-7809-46d0-9afd-f29d561d1251",
      },
      {
        habits_id: 3,
        user_count: 4,
        categories_id: 1,
        title: "운동을 해요",
        description: "걷기든 달리기든 뭐든 좋아요~ 지금 당장 운동을 시작해봐요",
        image:
          "https://cdn.discordapp.com/attachments/889931349148975177/897379469034151966/unknown.png",
        emoji_id: 3,
        color: "blue",
        creator_id: "e8023291-7809-46d0-9afd-f29d561d1252",
      },
    ]),
      {};
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("habits", null, {});
  },
};
