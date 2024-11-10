function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  return <div className="balance-display">
    <span>Your balance:</span>
    <span className="balance">{formatCurrency(123456)}</span>
  </div>;
}

export default BalanceDisplay;
