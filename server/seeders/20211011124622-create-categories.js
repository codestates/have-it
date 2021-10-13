module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          categories_id: 1,
          title: "💪🏻 운동",
          en_title: "exercise",
          level1image:
            "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/gray-exercise.svg",
          level2image:
            "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/exercise.svg",
          level3image:
            "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/up-exercise.svg",
        },
        {
          categories_id: 2,
          title: "📚 독서",
          en_title: "book",
          level1image:
            "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/gray-book.svg",
          level2image: "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/book.svg",
          level3image:
            "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/up-book.svg",
        },
        {
          categories_id: 3,
          title: "✏️ 공부",
          en_title: "study",
          level1image:
            "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/gray-study.svg",
          level2image:
            "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/study.svg",
          level3image:
            "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/up-study.svg",
        },
        {
          categories_id: 4,
          title: "💖 마음",
          en_title: "mind",
          level1image:
            "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/gray-mind.svg",
          level2image: "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/mind.svg",
          level3image:
            "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/up-mind.svg",
        },
        {
          categories_id: 5,
          title: "⏰ 생활 습관",
          en_title: "routine",
          level1image:
            "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/gray-routine.svg",
          level2image:
            "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/routine.svg",
          level3image:
            "https://haveit.s3.ap-northeast-2.amazonaws.com/%EB%B1%83%EC%A7%80/up-routine.svg",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("categories", null, {});
  },
};
