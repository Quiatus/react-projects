import { useReducer } from "react";

const INIT_BALANCE = 500
const LOAN = 5000
const DEF_DEPOSIT = 150
const DEF_WITHDRAW = 50

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  message: "Click 'Open account' to start"
};

const messages = {
  success: `Account open with initial balance of ${INIT_BALANCE}`,
  deposit: `Deposited ${DEF_DEPOSIT}`,
  withdraw: `Withdrew ${DEF_WITHDRAW}`,
  nofund: 'Not enough funds',
  borrow: `Loaned ${LOAN}`,
  loan: 'You cannot have more than one loan!',
  paid: 'Loan has been paid',
  close: 'Account has been closed',
  balance: 'Unable to close account: balance and loan must be 0!',
  noloan: 'You do not have any loans!'
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'openAccount':
      return {...state, isActive: true, balance: INIT_BALANCE, message: messages.success}
    case 'deposit':
      return {...state, balance: state.balance + DEF_DEPOSIT, message: messages.deposit}
    case 'withdraw':
      return state.balance >= DEF_WITHDRAW 
        ? {...state, balance: state.balance - DEF_WITHDRAW, message: messages.withdraw}
        : {...state, message: messages.nofund}
    case 'loan': 
      return state.loan 
        ? {...state, message: messages.loan}
        : {...state, balance: state.balance + LOAN, loan: LOAN, message: messages.borrow}
    case 'pay':
      if (!state.loan) return {...state, message: messages.noloan}  

      return state.balance >= LOAN
        ? {...state, balance: state.balance - LOAN, loan: state.loan - LOAN, message: messages.paid}
        : {...state, message: messages.nofund}
    case 'closeAccount':
      return (state.balance === 0 && state.loan === 0)
        ? {...state, isActive: false, message: messages.close}
        : {...state, message: messages.balance}
    default: 
      throw new Error('Unknown action')
  }
}

export default function BankAccount() {
  const [{isActive, balance, loan, message}, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="comp bank">
      <div className="bank-info">
        <p>Balance:</p>
        <p className="fb">{balance}</p>
        <p>Loan:</p>
        <p className="fb">{loan}</p>
      </div>
      <div className="bank-buttons">
        <button className="btnB" disabled={isActive} onClick={() => dispatch({ type: 'openAccount' })}>Open account</button>
        <button className="btnB" disabled={!isActive} onClick={() => dispatch({ type: 'deposit' })}>Deposit 150</button>
        <button className="btnB" disabled={!isActive} onClick={() => dispatch({ type: 'loan' })}>Request loan</button>
        <button className="btnB" disabled={!isActive} onClick={() => dispatch({ type: 'closeAccount' })}>Close account</button>
        <button className="btnB" disabled={!isActive} onClick={() => dispatch({ type: 'withdraw' })}>Withdraw 50</button>
        <button className="btnB" disabled={!isActive} onClick={() => dispatch({ type: 'pay' })}>Pay loan</button>
      </div>
      <p>{message}</p>
    </div>
  )
}
