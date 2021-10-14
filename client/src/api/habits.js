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
  joinHabit: () => api.post("/habits/:habits_id"),
  modifyHabit: (id, data, options) =>
    api.put(`/habits/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...options,
    }),
  getTitle: () => api.put("/habits/title/:habits_id"),
};

export default habitsApi;
