module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * password: 12341234$$
     */
    await queryInterface.bulkInsert(
      "users",
      [
        {
          users_id: "e8023291-7809-46d0-9afd-f29d561d1246",
          email: "naver@naver.com",
          password: "$2b$12$y5.tzZaIs23N0s//xP3XnOIW2ANv/02FRjUSElhOXoe4VaglRthVK",
          nickname: "naver",
          bio: null,
          image: null,
          sns: "naver",
        },
        {
          users_id: "e8023291-7809-46d0-9afd-f29d561d1247",
          email: "google@google.com",
          password: "$2b$12$y5.tzZaIs23N0s//xP3XnOIW2ANv/02FRjUSElhOXoe4VaglRthVK",
          nickname: "google",
          bio: null,
          image: null,
          sns: "google",
        },
        {
          users_id: "e8023291-7809-46d0-9afd-f29d561d1248",
          email: "local@local.com",
          password: "$2b$12$y5.tzZaIs23N0s//xP3XnOIW2ANv/02FRjUSElhOXoe4VaglRthVK",
          nickname: "local",
          bio: null,
          image: "https://haveit.s3.ap-northeast-2.amazonaws.com/profile/pf_5.svg",
          sns: "local",
        },
        {
          users_id: "e8023291-7809-46d0-9afd-f29d561d1249",
          email: "garlic@garlic.com",
          password: "$2b$12$y5.tzZaIs23N0s//xP3XnOIW2ANv/02FRjUSElhOXoe4VaglRthVK",
          nickname: "garlic",
          bio: "오직 너마늘",
          image: "https://haveit.s3.ap-northeast-2.amazonaws.com/profile/pf_1.svg",
          sns: "local",
        },
        {
          users_id: "e8023291-7809-46d0-9afd-f29d561d1250",
          email: "Potato@Potato.com",
          password: "$2b$12$y5.tzZaIs23N0s//xP3XnOIW2ANv/02FRjUSElhOXoe4VaglRthVK",
          nickname: "Potato",
          bio: "말하는 감자입니다",
          image: "https://haveit.s3.ap-northeast-2.amazonaws.com/profile/pf_2.svg",
          sns: "local",
        },
        {
          users_id: "e8023291-7809-46d0-9afd-f29d561d1251",
          email: "carrot@carrot.com",
          password: "$2b$12$y5.tzZaIs23N0s//xP3XnOIW2ANv/02FRjUSElhOXoe4VaglRthVK",
          nickname: "carrot",
          bio: "당근입니당",
          image: "https://haveit.s3.ap-northeast-2.amazonaws.com/profile/pf_3.svg",
          sns: "local",
        },
        {
          users_id: "e8023291-7809-46d0-9afd-f29d561d1252",
          email: "pig@pig.com",
          password: "$2b$12$y5.tzZaIs23N0s//xP3XnOIW2ANv/02FRjUSElhOXoe4VaglRthVK",
          nickname: "pig",
          bio: "다돼징",
          image: "https://haveit.s3.ap-northeast-2.amazonaws.com/profile/pf_4.svg",
          sns: "local",
        },
        {
          users_id: "e8023291-7809-46d0-9afd-f29d561d1253",
          email: "hi@hi.com",
          password: "$2b$12$y5.tzZaIs23N0s//xP3XnOIW2ANv/02FRjUSElhOXoe4VaglRthVK",
          nickname: "hi",
          bio: "hi",
          image: "https://haveit.s3.ap-northeast-2.amazonaws.com/profile/pf_6.svg",
          sns: "local",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
