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
          image: null,
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
