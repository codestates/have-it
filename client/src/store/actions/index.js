import {
  SIGNIN_MODAL_ON,
  SIGNUP_MODAL_ON,
  HABIT_CREATE_MODAL_ON,
  HABIT_JOIN_CANCEL,
  HABIT_JOIN_MODAL_ON,
  HABIT_JOIN_PROCEED,
  MODAL_OFF,
  SIGN_IN,
  SIGN_OUT,
  SHOW_POPUP,
  HIDE_POPUP,
  GET_HABITS,
} from "./actionTypes";

// action
// export const exampleAction = {
//   type: EXAMPLE_TYPE,
//   payload: "Example payload",
// };

// action creator
// export const exampleActionCreator = (payload) => ({
//   type: EXAMPLE_TYPE,
//   payload,
// });

// Modal
export const signInModalOnAction = {
  type: SIGNIN_MODAL_ON,
};
export const signUpModalOnAction = {
  type: SIGNUP_MODAL_ON,
};
export const habitCreateModalOnAction = {
  type: HABIT_CREATE_MODAL_ON,
};
export const habitJoinModalOnAction = {
  type: HABIT_JOIN_MODAL_ON,
};
export const modalOffAction = {
  type: MODAL_OFF,
};

// Auth
export const signInAction = {
  type: SIGN_IN,
  payload: { nickname: null, image: null },
};
export const signOutAction = {
  type: SIGN_OUT,
};

// Home
export const showPopupAction = {
  type: SHOW_POPUP,
};
export const hidePopupAction = {
  type: HIDE_POPUP,
};

// Habit Join
export const habitJoinProceedAction = (habit) => ({
  type: HABIT_JOIN_PROCEED,
  payload: habit,
});
export const habitJoinCancelAction = {
  type: HABIT_JOIN_CANCEL,
};
export const getHabitsAction = {
  type: GET_HABITS,
};
