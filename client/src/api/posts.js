import api from "./index";

const postsApi = {
  writePost: () => api.post("/posts/:habits_id"),
  modifyPost: () => api.put("/posts/:posts_id"),
  removePost: () => api.delete("/posts/:posts_id"),
};

export default postsApi;
