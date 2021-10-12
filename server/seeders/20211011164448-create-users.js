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
        {
          users_id: "e8023291-7809-46d0-9afd-f29d561d1249",
          email: "garlic@garlic.com",
          password: "$2b$12$y5.tzZaIs23N0s//xP3XnOIW2ANv/02FRjUSElhOXoe4VaglRthVK",
          nickname: "garlic",
          bio: "오직 너마늘",
          image: "http://www.foodnmed.com/news/photo/201906/18542_4239_4443.jpg",
          sns: "local",
        },
        {
          users_id: "e8023291-7809-46d0-9afd-f29d561d1250",
          email: "Potato@Potato.com",
          password: "$2b$12$y5.tzZaIs23N0s//xP3XnOIW2ANv/02FRjUSElhOXoe4VaglRthVK",
          nickname: "Potato",
          bio: "말하는 감자입니다",
          image:
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile8.uf.tistory.com%2Fimage%2F9933753D5EAC0D2117AF14",
          sns: "local",
        },
        {
          users_id: "e8023291-7809-46d0-9afd-f29d561d1251",
          email: "carrot@carrot.com",
          password: "$2b$12$y5.tzZaIs23N0s//xP3XnOIW2ANv/02FRjUSElhOXoe4VaglRthVK",
          nickname: "carrot",
          bio: "놔라",
          image: "https://www.nongmin.com/upload/old/www_data/photo/2014/1201/20141129143136.jpg",
          sns: "local",
        },
        {
          users_id: "e8023291-7809-46d0-9afd-f29d561d1252",
          email: "pig@pig.com",
          password: "$2b$12$y5.tzZaIs23N0s//xP3XnOIW2ANv/02FRjUSElhOXoe4VaglRthVK",
          nickname: "pig",
          bio: "채식을 합시다",
          image:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA1MjNfMTU4%2FMDAxNjIxNzU4MDY5NTEw.ki3QONsB8volJjor2mVOpdI0xqbz0L15MtNkx-5fr0kg.JGoSzX1NiqTBpCAjYHYGO9m1Zv5ZyjywLomui_MCS8Ig.JPEG.p5260218%2F1621757845872.jpg&type=sc960_832",
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
