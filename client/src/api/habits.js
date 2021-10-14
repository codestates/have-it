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
  createHabit: () => api.post("/habits"),
  findHabitById: (id) => api.get(`/habits/${id}`),
  joinHabit: () => api.post("/habits/:habits_id"),
  TBD: () => api.put("/habits/:habits_id"),
  getTitle: () => api.put("/habits/title/:habits_id"),
};

export default habitsApi;
