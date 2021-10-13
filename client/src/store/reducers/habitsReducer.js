import { FIND_HABITS } from "../actions/actionTypes";

const initialState = {
  habitsId: null,
  userCount: null,
  title: null,
  description: null,
  image: null,
  emojiId: null,
  color: null,
  createdAt: null,
  categoriesId: null,
  creatorId: null,
  topUser: null,
};

const habitsReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case FIND_HABITS:
      state = {
        ...prevState,
      };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default habitsReducer;
