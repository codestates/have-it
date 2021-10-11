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
          level1image: "1",
          level2image: "1",
          level3image: "1",
        },
        {
          categories_id: 2,
          title: "📚 독서",
          en_title: "book",
          level1image: "1",
          level2image: "1",
          level3image: "1",
        },
        {
          categories_id: 3,
          title: "✏️ 공부",
          en_title: "study",
          level1image: "1",
          level2image: "1",
          level3image: "1",
        },
        {
          categories_id: 4,
          title: "💖 마음",
          en_title: "exercise",
          level1image: "1",
          level2image: "1",
          level3image: "1",
        },
        {
          categories_id: 5,
          title: "⏰ 생활 습관",
          en_title: "exercise",
          level1image: "1",
          level2image: "1",
          level3image: "1",
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
