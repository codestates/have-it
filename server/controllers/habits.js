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
        attributes: { exclude: ["created_at"] },
      });
      const postlist = await habitInfo.getPosts({
        attributes: { exclude: ["updatedAt"] },
      });
      const posts = postlist.map((el) => {
        return snakeToCamal(el.dataValues);
      });
      const categoryInfo = await habitInfo.getCategory({ attributes: ["title"] });
      const categoryTitle = categoryInfo.dataValues.title;
      delete habitInfo.dataValues.categories_id;
      const userHabitInfo = await Userhabit.findOne({
        where: { users_id: req.userId, habits_id },
        attributes: [
          "userhabits_id",
          "goal",
          "actual_amount",
          "target_amount",
          "start_date",
          "end_date",
        ],
      });
      if (userHabitInfo) {
        res.status(200).json({
          message: "ok",
          data: {
            habits: { ...snakeToCamal(habitInfo.dataValues), categoryTitle, posts },
            userInfo: snakeToCamal(userHabitInfo.dataValues || null),
          },
        });
      } else {
        res.status(200).json({
          message: "ok",
          data: {
            habits: { ...snakeToCamal(habitInfo.dataValues), categoryTitle, posts },
            userInfo: null,
          },
        });
      }
    } catch (err) {
      DBERROR(res, err);
    }
  },
  joinHabit: async (req, res) => {
    const { habits_id, goal, habit_day, start_date, end_date } = req.body;
    try {
      const joinHabit = await Userhabit.create({
        users_id: req.userId,
        habits_id,
        goal,
        habit_day,
        start_date,
        end_date,
      });
      const { done } = joinHabit.dataValues;
      const habitInfo = await joinHabit.getHabit({
        attributes: ["habits_id", "user_count", "title", "emoji_id", "color"],
      });
      const top_users = await Userhabit.findAll({
        where: { habits_id },
        attributes: [],
        order: [["achievement", "DESC"]],
        limit: 5,
        include: { model: User, attributes: ["users_id", "image"] },
      });
      const topUsers = [];
      top_users.forEach((el) => {
        topUsers.push(el.dataValues.User.dataValues);
      });

      res.status(200).json({
        message: "ok",
        data: { ...snakeToCamal(habitInfo.dataValues), done, endDate: end_date, topUsers },
      });
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
