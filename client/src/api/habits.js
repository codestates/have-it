import api from "./index";

const habitsApi = {
  getHabits: () => api.post("/habits/"),
};

export default habitsApi;
