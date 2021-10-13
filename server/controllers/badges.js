const { Userhabit, Habit, Category } = require("../models");
const { snakeToCamal, DBERROR } = require("./functions");

module.exports = {
  getUserLevel: async (req, res) => {
    const categoriesLevel = [0, 0, 0, 0, 0, 0];
    try {
      const getUserhabits = await Userhabit.findAll({
        where: { users_id: req.userId, done: 1 },
        attributes: [],
        include: [{ model: Habit, attributes: ["categories_id"] }],
      });
      getUserhabits.forEach((el) => {
        ++categoriesLevel[el.dataValues.Habit.dataValues.categories_id];
      });
      const data = [];
      for (let i = 1; i <= 5; i++) {
        const level = Math.floor(categoriesLevel[i] / 10);
        const levelField = `level${level + 1}image`;
        const categoryInfo = await Category.findOne({
          where: { categories_id: i },
          attributes: [levelField],
        });
        data.push({
          categoriesId: i,
          count: categoriesLevel[i],
          badge: { level, image: categoryInfo.dataValues[levelField] },
        });
      }
      res.status(200).json({ message: "ok", data });
    } catch (err) {
      DBERROR(res, err);
    }
  },
};
