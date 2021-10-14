import { HABIT_JOIN_PROCEED, HABIT_JOIN_CANCEL } from "../actions/actionTypes";

const initialState = {
  id: null,
  title: null,
  emojiId: null,
  color: null,
};

const habitJoinReducer = (prevState = initialState, { type, payload }) => {
  let state;
  switch (type) {
    case HABIT_JOIN_PROCEED:
      state = {
        habitsId: payload.habitsId,
        title: payload.title,
        emojiId: payload.emojiId,
        color: payload.color,
      };
      break;
    case HABIT_JOIN_CANCEL:
      state = { ...initialState };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default habitJoinReducer;
