import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

//Creating a root reducer so that we can use multiple reducers in store
//account and customer are state object
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//Creating store by using createStore method from redux
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
