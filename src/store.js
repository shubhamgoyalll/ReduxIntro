import { createStore } from "redux";

const initialState = {
  loan: 0,
  balance: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
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

//Creating store by using createStore method from redux
const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 1000 });
store.dispatch({ type: "account/withdraw", payload: 300 });
console.log(store.getState());

//First time passing object in a payload which is fine
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 1000, purpose: "Buy a Car" },
});

console.log(store.getState());

store.dispatch({ type: "account/payLoan" });
console.log(store.getState());
