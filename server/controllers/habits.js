const { Habit, Userhabit, User, Category, Post } = require("../models");

const DBERROR = (res, err) => {
  res.status(500).json({ message: `Error occured in database: ${err}` });
};

module.exports = {
  createHabit: async (req, res) => {
    const { categories_id, title, description, emoji_id, color } = req.body;
    try {
      const createHabit = await Habit.create({
        categories_id,
        title,
        description,
        emoji_id,
        color,
        creator_id: req.userId,
      });
      res.status(201).json(createHabit.dataValues); //TODO: 데이터 정제 필요
    } catch (err) {
      DBERROR(res, err);
    }
  },
  findHabits: async (req, res) => {
    const { category, sort, limit } = req.query;
    //sort값 [sortByUserCount, sortByCreatedAt] 인기순은 advanced
    const sortValue = sort === "sortByCreatedAt" ? "created_at" : "user_count";
    if (category) {
      try {
        const foundCategory = await Category.findOne({ where: { en_title: category } });
        const habitsList = await foundCategory.findHabits({
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
          const title = habitsList[i].dataValues;
          habitsInfo.push({ ...title, top_user: userInfo });
        }
        res.status(200).json(habitsInfo);
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
        const title = habitsList[i].dataValues;
        habitsInfo.push({ ...title, top_user: userInfo });
      }
      res.status(200).json(habitsInfo);
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
          include: {
            model: User,
            attributes: ["nickname"],
          },
        },
      });
      const userHabitInfo = await Userhabit.findOne({
        where: { users_id: req.userId, habits_id },
        attributes: ["userhabits_id", "goal", "actual_amount", "target_amount"],
      });
      res.status(200).json({ habits: habitInfo, userInfo: userHabitInfo });
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
      res.status(200).json({ userhabits_id: joinHabit.dataValues.userhabits_id });
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
    res.status(200).send("아직 구현 중 입니다");
  },
};
