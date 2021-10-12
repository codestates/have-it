import api from "./index";

const authApi = {
  checkNickname: () => api.get("/auth/nickname/:nickname"),
  checkEmail: () => api.get("/auth/email/:email"),
  signin: (email, password) => api.post("/auth/signin", { email, password }),
  signout: () => api.get("/auth/signout"),
  signup: () => api.post("/auth/signup"),
  me: () => api.get("/auth/me"),
};

export default authApi;
