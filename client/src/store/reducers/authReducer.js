import { SIGN_IN, SIGN_OUT } from "../actions/actionTypes";

const initialState = {
  isLogin: false,
  users_id: null,
  email: null,
  nickname: null,
  bio: null,
  image: null,
  sns: null,
  createdAt: null,
  updatedAt: null,
};

const authReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case SIGN_IN:
      state = {
        ...prevState,
        isLogin: true,
        nickname: action.payload.nickname,
        image: action.payload.image,
      };
      break;
    case SIGN_OUT:
      state = { ...prevState, isLogin: false };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default authReducer;
