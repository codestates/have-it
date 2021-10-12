import { FIND_HABITS } from "../actions/actionTypes";

const initialState = {
  habits_id: null,
  user_count: null,
  title: null,
  description: null,
  image: null,
  emoji_id: null,
  color: null,
  created_at: null,
  categories_id: null,
  creator_id: null,
  top_user: null,
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
