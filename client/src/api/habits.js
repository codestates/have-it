import api from "./index";

const habitsApi = {
  findHabits: (category, limit, sort) => {
    const params = {
      category,
      limit,
      sort,
    };
    return api.get("/habits", {
      params,
    });
  },
  createHabit: (categoryId, color, emojiId, title, description) =>
    api.post("/habits", {
      categories_id: categoryId,
      color,
      emoji_id: emojiId,
      title,
      description,
    }),
  findHabitById: (id) => api.get(`/habits/${id}`),
  joinHabit: (habitsId, startDate, endDate, goal, habitDayNumber) =>
    api.post(`/habits/${habitsId}`, {
      habits_id: habitsId,
      goal,
      habit_day: habitDayNumber,
      start_date: startDate,
      end_date: endDate,
    }),
  modifyHabit: (id, data, options) =>
    api.put(`/habits/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...options,
    }),
  getTitle: (id) => api.get(`/habits/title/${id}`),
};

export default habitsApi;
