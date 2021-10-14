import api from "./index";

const postsApi = {
  writePost: (id, data, options) =>
    api.post(`/posts/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...options,
    }),
  modifyPost: () => api.put("/posts/:posts_id"),
  removePost: (id) => api.delete(`/posts/${id}`),
};

export default postsApi;
