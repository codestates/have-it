import api from "./index";

const badgesApi = {
  getBadges: (usersId) => api.get(`/badges?userId=${usersId}`),
};

export default badgesApi;
