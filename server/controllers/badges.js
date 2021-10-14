const { Userhabit, Habit, Category } = require("../models");
const { snakeToCamal, DBERROR } = require("./functions");

module.exports = {
  getUserLevel: async (req, res) => {
    const categoriesLevel = [0, 0, 0, 0, 0, 0];
    try {
      const getUserhabits = await Userhabit.findAll({
        where: { users_id: req.userId },
        attributes: ["actual_amount"],
        include: [{ model: Habit, attributes: ["categories_id"] }],
      });
      getUserhabits.forEach((el) => {
        categoriesLevel[el.dataValues.Habit.dataValues.categories_id] +=
          el.dataValues.actual_amount;
      });
      const data = [];
      for (let i = 1; i <= 5; i++) {
        let level;
        if (categoriesLevel[i] >= 20) {
          level = 3;
        } else {
          level = Math.floor(categoriesLevel[i] / 10) + 1;
        }
        const levelField = `level${level}image`;
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
