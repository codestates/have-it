import api from "./index";

const authApi = {
  checkNickname: (nickname) => api.get(`/auth/nickname/${nickname}`),
  checkEmail: (email) => api.get(`/auth/email/${email}`),
  signin: (email, password) => api.post("/auth/signin", { email, password }),
  signout: () => api.get("/auth/signout"),
  signup: (nickname, email, password) => api.post("/auth/signup", { nickname, email, password }),
  me: () => api.get("/auth/me"),
  naver: (authorizationCode) =>
    api.post(
      "/auth/naver",
      { authorizationCode },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  google: (authorizationCode) =>
    api.post(
      "/auth/google",
      { authorizationCode },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
};

export default authApi;
