import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  loan: 0,
  balance: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return { ...state };
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

//Creating a root reducer so that we can use multiple reducers in store
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

//Creating store by using createStore method from redux
const store = createStore(rootReducer);
// store.dispatch({ type: "account/deposit", payload: 1000 });
// store.dispatch({ type: "account/withdraw", payload: 300 });
// console.log(store.getState());

// //First time passing object in a payload which is fine
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a Car" },
// });

// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

//We cam use this as a variable in type in dispatch and as a case type in reducer fnc
// const ACCOUNT_DEPOSIT = "account/deposit";

//action creator -> returns an action
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return {
    type: "account/payLoan",
  };
}

store.dispatch(deposit(1000));
console.log(store.getState());

store.dispatch(withdraw(300));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a Car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

store.dispatch(createCustomer("Shubham Goyal", "007"));
store.dispatch(deposit(1000));
console.log(store.getState());

store.dispatch(updateName("Rohan Joshi"));
console.log(store.getState());
