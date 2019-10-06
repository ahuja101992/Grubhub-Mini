import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  order: orderReducer
});
export default rootReducer;
