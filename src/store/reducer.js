import { combineReducers } from "redux";
// slices
import ticketsReducer from "./../features/ticketsSlice";

const rootReducer = combineReducers({
  tickets: ticketsReducer,
});

export default rootReducer;
