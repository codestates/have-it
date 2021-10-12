import api from "./index";

const authApi = {
  signin: (email, password) => api.post("/auth/signin", { email, password }),
  signout: () => api.get("/auth/signout"),
};

export default authApi;
