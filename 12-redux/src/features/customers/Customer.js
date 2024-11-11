import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector(store => store.customer.fullName)
  return <h2 className="h-marg">👋 Welcome, {customer}</h2>;
}

export default Customer;
