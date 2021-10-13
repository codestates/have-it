const { Habit, Userhabit, User, Category, Post } = require("../models");
const { snakeToCamal, DeleteImageinTable, DBERROR } = require("./functions");

module.exports = {
  createHabit: async (req, res) => {
    const {
      categories_id,
      title: title_,
      description,
      emoji_id: emoji_id_,
      color: color_,
    } = req.body;
    try {
      const createHabit = await Habit.create({
        categories_id,
        title: title_,
        description,
        emoji_id: emoji_id_,
        color: color_,
        creator_id: req.userId,
      });
      const { habits_id, title, emoji_id, color } = createHabit.dataValues;
      res
        .status(201)
        .json({ message: "ok", data: snakeToCamal({ habits_id, title, emoji_id, color }) });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  findHabits: async (req, res) => {
    const { category, sort, limit } = req.query;
    const sortValue = sort === "sortByCreatedAt" ? "created_at" : "user_count";
    if (category) {
      try {
        const foundCategory = await Category.findOne({ where: { en_title: category } });
        console.log(foundCategory);
        if (!foundCategory) {
          res.status(200).json({ message: "I don't have data", data: null });
        }
        const habitsList = await foundCategory.getHabits({
          order: [[sortValue, "DESC"]],
          limit: +limit || null,
        });
        const habitsInfo = [];
        for (let i = 0; i < habitsList.length; i++) {
          const userInfo = await habitsList[i].getUserhabits({
            limit: 5,
            order: [["achievement", "desc"]],
            include: [{ model: User, attributes: ["users_id", "image"] }],
            attributes: [],
          });
          const {
            habits_id,
            user_count,
            title: title_,
            emoji_id,
            color,
          } = habitsList[i].dataValues;
          const title = snakeToCamal({ habits_id, user_count, title: title_, emoji_id, color });
          userInfoInHabit = userInfo.map((el) => {
            return snakeToCamal(el.User.dataValues);
          });
          habitsInfo.push({ ...title, topUsers: userInfoInHabit });
        }

        res.status(200).json({ message: "ok", data: habitsInfo });
      } catch (err) {
        DBERROR(res, err);
      }
    } else {
      let habitsList = await Habit.findAll({
        order: [[sortValue, "DESC"]],
        limit: +limit || null,
      });
      const habitsInfo = [];
      for (let i = 0; i < habitsList.length; i++) {
        const userInfo = await habitsList[i].getUserhabits({
          limit: 5,
          order: [["achievement", "desc"]],
          include: [{ model: User, attributes: ["users_id", "image"] }],
          attributes: [],
        });
        const { habits_id, user_count, title: title_, emoji_id, color } = habitsList[i].dataValues;
        const title = snakeToCamal({
          habits_id,
          user_count,
          title: title_,
          emoji_id,
          color,
        });
        userInfoInHabit = userInfo.map((el) => {
          return snakeToCamal(el.User.dataValues);
        });
        habitsInfo.push({ ...title, topUsers: userInfoInHabit });
      }
      res.status(200).json({ message: "ok", data: habitsInfo });
      try {
      } catch (err) {
        DBERROR(res, err);
      }
    }
  },
  findHabitById: async (req, res) => {
    const { habits_id } = req.params;
    try {
      const habitInfo = await Habit.findOne({
        where: { habits_id },
        include: {
          model: Post,
          attributes: { exclude: ["updatedAt"] },
        },
        attributes: { exclude: ["created_at"] },
      });

      const userHabitInfo = await Userhabit.findOne({
        where: { users_id: req.userId, habits_id },
        attributes: ["userhabits_id", "goal", "actual_amount", "target_amount"],
      });
      if (userHabitInfo) {
        res.status(200).json({
          message: "ok",
          data: {
            habits: snakeToCamal(habitInfo.dataValues),
            userInfo: snakeToCamal(userHabitInfo.dataValues || null),
          },
        });
      } else {
        res.status(200).json({
          message: "ok",
          data: {
            habits: snakeToCamal(habitInfo.dataValues),
            userInfo: null,
          },
        });
      }
    } catch (err) {
      DBERROR(res, err);
    }
  },
  joinHabit: async (req, res) => {
    //TODO: 날짜 데이터 확정되면 추가할 필드 start_date, end_date , 현재 디폴트 now()
    const { habits_id, goal, habit_day } = req.body;
    try {
      const joinHabit = await Userhabit.create({
        users_id: req.userId,
        habits_id,
        goal,
        habit_day,
      });
      const infoOfHabit = await joinHabit.getHabit();
      await infoOfHabit.update({ user_count: infoOfHabit.user_count + 1 });
      res.status(200).json({ userhabitsId: joinHabit.dataValues.userhabits_id });
    } catch (err) {
      DBERROR(res, err);
    }
  },
  getTitle: async (req, res) => {
    const { habits_id } = req.params;
    try {
      const habitsTitle = await Habit.findOne({
        where: {
          habits_id,
        },
        attributes: ["title"],
      });
      res.status(200).json(habitsTitle);
    } catch (err) {
      DBERROR(res, err);
    }
  },
  modifyHabit: async (req, res) => {
    const { habits_id } = req.params;
    const { description } = req.body;
    try {
      const habitInfo = await Habit.findOne({ where: { habits_id } });
      const { image } = habitInfo.dataValues;
      if (image && req.file) {
        DeleteImageinTable(image);
      }
      await Habit.update({ description, image: req.file.location }, { where: { habits_id } });
      res.status(200).json({ message: "ok", data: { habitsId: habits_id } });
    } catch (err) {
      DBERROR(res, err);
    }
  },
};
