import { combineReducers } from "redux";
import audiosReducer from "./audiosReducer";

export default combineReducers({
  audiosStore: audiosReducer
});
