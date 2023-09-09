import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

//Creating a root reducer so that we can use multiple reducers in store
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//Creating store by using createStore method from redux
const store = createStore(rootReducer);

export default store;
