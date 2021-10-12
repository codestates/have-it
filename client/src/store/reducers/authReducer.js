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
        // users_id: action.payload.users_id,
        email: action.payload.email,
        nickname: action.payload.nickname,
        bio: action.payload.bio,
        image: action.payload.image,
        sns: action.payload.sns,
        // createdAt: action.payload.createdAt,
        // updatedAt: action.payload.updatedAt,
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
