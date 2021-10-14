import { HIDE_POPUP, SHOW_POPUP } from "../actions/actionTypes";

const initialState = {
  isPopup: true,
};

const homeReducer = (prevState = initialState, action) => {
  let state;
  switch (action.type) {
    case SHOW_POPUP:
      state = { ...prevState, isPopup: true };
      break;
    case HIDE_POPUP:
      state = { ...prevState, isPopup: false };
      break;
    default:
      state = { ...prevState };
  }
  return state;
};

export default homeReducer;
