import { combineReducers } from "redux";
import auth from "./auth";
import * as member from "./MemberReducer";

const rootReducer = combineReducers({ auth, member });

export default rootReducer;