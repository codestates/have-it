import { SIGN_IN, SIGN_OUT } from "../actions/actionTypes";

const initialState = {
  isLogin: false,
  hasProfileImage: false,
};

const authReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case SIGN_IN:
      state = { ...prevState, isLogin: true };
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
