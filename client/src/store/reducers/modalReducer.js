import {
  SIGNIN_MODAL_ON,
  SIGNUP_MODAL_ON,
  HABIT_CREATE_MODAL_ON,
  HABIT_JOIN_MODAL_ON,
  MODAL_OFF,
} from "../actions/actionTypes";

const initialState = {
  isSignInModal: false,
  isSignUpModal: false,
  isHabitCreateModal: false,
  isHabitJoinModal: false,
};

const modalReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case SIGNIN_MODAL_ON:
      state = { ...prevState, isSignInModal: true };
      break;
    case SIGNUP_MODAL_ON:
      state = { ...prevState, isSignUpModal: true };
      break;
    case HABIT_CREATE_MODAL_ON:
      state = { ...prevState, isHabitCreateModal: true };
      break;
    case HABIT_JOIN_MODAL_ON:
      state = { ...prevState, isHabitJoinModal: true };
      break;
    case MODAL_OFF:
      state = { ...initialState };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default modalReducer;
