const { Category } = require("../models");

module.exports = {
  getCategories: async (req, res) => {
    try {
      const foundCategories = await Category.findAll();
      const refinedCategories = foundCategories.map(
        ({ dataValues: { categories_id, title, en_title } }) => ({
          id: categories_id,
          title,
          enTitle: en_title,
        })
      );
      return res.status(200).json({ categories: refinedCategories });
    } catch (err) {
      return res.status(500).json({ message: `Error occured in database: ${err}` });
    }
  },
  getCategoryByEnTitle: async (req, res) => {
    const { enTitle } = req.params;
    try {
      const foundCategory = await Category.findOne({ where: { en_title: enTitle } });
      const { categories_id: id, title } = foundCategory.dataValues;
      return res.status(200).json({ category: { id, title, enTitle } });
    } catch (err) {
      return res.status(500).json({ message: `Error occured in database: ${err}` });
    }
  },
};
