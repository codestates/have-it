import api from "./index";

const habitsApi = {
  findHabits: () => api.get("/habits"),
  createHabit: () => api.post("/habits"),
  findHabitById: () => api.get("/habits/:habits_id"),
  joinHabit: () => api.post("/habits/:habits_id"),
  TBD: () => api.put("/habits/:habits_id"),
  getTitle: () => api.put("/habits/title/:habits_id"),
};

export default habitsApi;
