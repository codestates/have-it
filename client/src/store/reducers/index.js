import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import homeReducer from "./homeReducer";
import habitsReducer from "./habitsReducer";

const rootReducer = combineReducers({
  modalReducer,
  authReducer,
  homeReducer,
  habitsReducer,
  // ...exampleReducer,
});

export default rootReducer;
