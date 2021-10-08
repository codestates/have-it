import {
  AUTH_MODAL_ON,
  HABIT_CREATE_MODAL_ON,
  HABIT_JOIN_MODAL_ON,
  MODAL_OFF,
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
export const authModalOnAction = {
  type: AUTH_MODAL_ON,
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

