const { isAuthorized } = require("./tokenFunctions");
const { Habit, Userhabit, User, Category } = require("../models");

module.exports = {
  createHabit: (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      res.status(404).send("invalid user");
    } else {
      const { categories_id, title, description, emoji_id, color } = req.body;
      Habit.create({
        categories_id,
        title,
        description,
        emoji_id,
        color,
        creator_id: accessTokenData.users_id,
      })
        .then((result) => {
          const { habits_id, title, description, emoji_id, color } = result.dataValues;
          res.status(200).json({ habits_id, title, description, emoji_id, color });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("실수한듯");
        });
    }
  },
  findHabits: async (req, res) => {
    const { category, sort, limit } = req.query;

    res.status(200).send("산책가자");
  },
  findHabitById: (req, res) => {},
  joinHabit: (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      res.status(404).send("invalid user");
    } else {
      // start_date: 1,
      // end_date: 1, //TODO: 날짜 데이터 확정되면 추가하기
      const { habits_id, goal, habit_day, start_date, end_date } = req.body;
      Userhabit.create({
        users_id: accessTokenData.users_id,
        habits_id,
        goal,
        habit_day,
      })
        .then(async (result) => {
          const a = await result.getHabit();
          await a.update({ user_count: a.user_count + 1 });
          res.status(200).json({ userhabits_id: result.dataValues.userhabits_id });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("뭔가 잘못됨");
        });
    }
  },
};
