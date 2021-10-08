import { combineReducers } from "redux";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  modalReducer,
  // ...exampleReducer,
});

export default rootReducer;
