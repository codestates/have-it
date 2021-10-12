"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "userhabits",
      [
        {
          userhabits_id: 1,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1249",
          habits_id: 1,
          goal: "나 마늘, 채식을 반대합니다",
          habit_day: 63,
          start_date: "2021-10-12 10:10:10",
          end_date: "2022-10-12 10:10:10",
        },
        {
          userhabits_id: 2,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1250",
          habits_id: 1,
          goal: "나 감자, 채식을 반대합니다",
          habit_day: 63,
          start_date: "2021-10-12 10:10:10",
          end_date: "2022-10-12 10:10:10",
        },
        {
          userhabits_id: 3,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1251",
          habits_id: 1,
          goal: "나 당근, 채식을 반대합니다",
          habit_day: 63,
          start_date: "2021-10-12 10:10:10",
          end_date: "2022-10-12 10:10:10",
        },
        {
          userhabits_id: 4,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1252",
          habits_id: 1,
          goal: "나 돼지, 채식합시다",
          habit_day: 63,
          start_date: "2021-10-12 10:10:10",
          end_date: "2022-10-12 10:10:10",
        },
        {
          userhabits_id: 5,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1249",
          habits_id: 1,
          goal: "나 마늘, 육식을 합시다",
          habit_day: 63,
          start_date: "2021-10-12 10:10:10",
          end_date: "2022-10-12 10:10:10",
        },
        {
          userhabits_id: 6,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1250",
          habits_id: 1,
          goal: "나 감자, 육식을 합시다",
          habit_day: 63,
          start_date: "2021-10-12 10:10:10",
          end_date: "2022-10-12 10:10:10",
        },
        {
          userhabits_id: 7,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1251",
          habits_id: 1,
          goal: "나 당근, 육식을 합시다",
          habit_day: 63,
          start_date: "2021-10-12 10:10:10",
          end_date: "2022-10-12 10:10:10",
        },
        {
          userhabits_id: 8,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1252",
          habits_id: 1,
          goal: "육식 반대",
          habit_day: 63,
          start_date: "2021-10-12 10:10:10",
          end_date: "2022-10-12 10:10:10",
        },
        {
          userhabits_id: 9,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1249",
          habits_id: 1,
          goal: "10km 안쉬고 달리기",
          habit_day: 63,
          start_date: "2021-10-12 10:10:10",
          end_date: "2022-10-12 10:10:10",
        },
        {
          userhabits_id: 10,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1250",
          habits_id: 1,
          goal: "구르기 연습",
          habit_day: 63,
          start_date: "2021-10-12 10:10:10",
          end_date: "2022-10-12 10:10:10",
        },
        {
          userhabits_id: 11,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1251",
          habits_id: 1,
          goal: "숨 30분 참기",
          habit_day: 63,
          start_date: "2021-10-12 10:10:10",
          end_date: "2022-10-12 10:10:10",
        },
        {
          userhabits_id: 12,
          users_id: "e8023291-7809-46d0-9afd-f29d561d1252",
          habits_id: 1,
          goal: "30kg 감량 후 농장 탈출",
          habit_day: 63,
          start_date: "2021-10-12 10:10:10",
          end_date: "2022-10-12 10:10:10",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("userhabits", null, {});
  },
};
