import api from "./index";

const usersApi = {
  modifyUserInfo: (usersId, formData) => {
    console.log("정길", usersId);

    return api.put(`/users/${usersId}`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
  removeUserInfo: (usersId) => api.delete(`/users/${usersId}`),
};

export default usersApi;
