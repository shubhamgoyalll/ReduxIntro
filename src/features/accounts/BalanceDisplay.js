import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

//Here state is the state ojbect which as account and customer state from rootReducer
function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  };
}

//connect(mapStateToProps) this returns a new component which will have balance prop
export default connect(mapStateToProps)(BalanceDisplay);
