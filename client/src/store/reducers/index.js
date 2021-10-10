import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";
import homeReducer from "./homeReducer";

const rootReducer = combineReducers({
  modalReducer,
  authReducer,
  homeReducer,
  // ...exampleReducer,
});

export default rootReducer;
