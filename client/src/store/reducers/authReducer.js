import { SIGN_IN, SIGN_OUT, UPDATE_INFO, UPDATE_USER_HABIT } from "../actions/actionTypes";

const initialState = {
  isLogin: false,
  usersId: null,
  email: null,
  nickname: "",
  bio: "",
  image: null,
  habits: [],
};

const authReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case SIGN_IN:
      state = {
        ...prevState,
        isLogin: true,
        ...action.payload,
      };
      break;
    case SIGN_OUT:
      state = { ...initialState };
      break;
    case UPDATE_INFO:
      state = {
        ...prevState,
        image: action.payload.data.image,
        nickname: action.payload.data.nickname,
        bio: action.payload.data.bio,
      };
      break;
    case UPDATE_USER_HABIT:
      state = {
        ...prevState,
        habits: [
          ...prevState.habits,
          {
            ...action.payload,
          },
        ],
      };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default authReducer;
