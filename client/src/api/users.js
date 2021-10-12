import api from "./index";

const usersApi = {
  modifyUserInfo: () => api.put("/users/:users_id"),
  removeUserInfo: () => api.delete("/users/:users_id"),
};

export default usersApi;
