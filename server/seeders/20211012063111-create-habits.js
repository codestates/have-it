"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("habits", [
      {
        habits_id: 1,
        user_count: 4,
        categories_id: 5,
        title: "독서해요!",
        description: "마음의 양식을 채워요",
        image: null,
        emoji_id: 1,
        color: "green",
        creator_id: "e8023291-7809-46d0-9afd-f29d561d1252",
      },
      {
        habits_id: 2,
        user_count: 4,
        categories_id: 5,
        title: "감사일기를 작성해요",
        description: "하루에 감사한 일들을 적어봐요",
        image: null,
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
        image: null,
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
