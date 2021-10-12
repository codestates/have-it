import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import homeReducer from "./homeReducer";
import habitJoinReducer from "./habitJoinReducer";
import habitsReducer from "./habitsReducer";

const rootReducer = combineReducers({
  modalReducer,
  authReducer,
  homeReducer,
  habitJoinReducer,
  habitsReducer,
  // ...exampleReducer,
});

export default rootReducer;
