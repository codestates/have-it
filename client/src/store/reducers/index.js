import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import homeReducer from "./homeReducer";
import habitJoinReducer from "./habitJoinReducer";

const rootReducer = combineReducers({
  modalReducer,
  authReducer,
  homeReducer,
  habitJoinReducer,
  // ...exampleReducer,
});

export default rootReducer;
