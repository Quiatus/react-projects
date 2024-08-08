import { useState } from "react"

export default function TipCalculator() {

  const [bill, setBill] = useState(0)
  const [tip, setTip] = useState(0)
  const [tipFriend, setTipFriend] = useState(0)

  function handleReset() {
    setBill(0)
    setTip(0)
    setTipFriend(0)
  }

  return (
    <div className="comp tipcalc">
      <Bill bill={bill} setBill={setBill}/>
      <Tip tip={tip} setTip={setTip}>How did you like the service?</Tip>
      <Tip tip={tipFriend} setTip={setTipFriend}>How did your friend like the service?</Tip>
      <Total bill={bill} tip={tip} tipFriend={tipFriend} />
      <Reset onClick={handleReset} />
    </div>
  )
}

function Bill({bill, setBill}) {
  return (
    <div className="form-line">
      <p>How much was the bill?</p>
      <input type="text" value={bill} onChange={e => setBill(Number(e.target.value))}/>
    </div>
  )
}

function Tip({children, tip, setTip}) {
  return (
    <div className="form-line">
      <p>{children}</p>
      <select value={tip} onChange={e => setTip(Number(e.target.value))}>
      <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  )  
}

function Total({bill, tip, tipFriend}) {
  const calcTips = () => Math.round(((bill / 100 * tip) + (bill / 100 * tipFriend)) / 2)
  
  return <p className="total">Your total is <strong>${bill + calcTips()}</strong> (${bill} + ${calcTips()} tip)</p>
}

function Reset({onClick}) {
  return (
    <div className="center">
      <button className="btnB" onClick={onClick}>Reset</button>
    </div>
  )
}