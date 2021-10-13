const { Habit, Userhabit, User, Category, Post } = require("../models");
const { snakeToCamal, DBERROR } = require("./functions");
module.exports = {
  modifyUserhabitGoal: async (req, res) => {
    const { habits_id } = req.query;
    const { goal } = req.body;
    try {
      let userhabits = await Userhabit.findOne({
        where: { users_id: req.userId, habits_id },
        // attributes: ["userhabits_id", "actual_amount"],
      });
      userhabits.update({ goal });
      const userInfo = snakeToCamal(userhabits.dataValues);
      res.status(200).json({ message: "ok", data: { userInfo } });
    } catch (err) {
      DBERROR(err);
    }
  },
};
