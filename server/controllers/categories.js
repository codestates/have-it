module.exports = {
  getCategories: (req, res) => {
    // TODO: DB와 연결
    const categories = [
      { id: 1, title: "💪🏻 운동", en_title: "exercise" },
      { id: 2, title: "📚 독서", en_title: "book" },
      { id: 3, title: "✏️ 공부", en_title: "study" },
      { id: 4, title: "💖 마음", en_title: "mind" },
      { id: 5, title: "⏰ 생활 습관", en_title: "routine" },
    ];
    res.json({ categories });
  },
  getCategoryByEnTitle: (req, res) => {
    const { enTitle } = req.params;
    // TODO: DB와 연결
    const categories = [
      { id: 1, title: "💪🏻 운동", en_title: "exercise" },
      { id: 2, title: "📚 독서", en_title: "book" },
      { id: 3, title: "✏️ 공부", en_title: "study" },
      { id: 4, title: "💖 마음", en_title: "mind" },
      { id: 5, title: "⏰ 생활 습관", en_title: "routine" },
    ];
    const foundCategory = categories.find((category) => category.en_title === enTitle);
    res.json({ id: foundCategory.id, title: foundCategory.title });
  },
};
