import { useState } from 'react';

export default function Counter() {
  const today = new Date()

  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)

  function changeStep(value) {
    setStep(value)
  }

  function getDateDifference() {
    const date = new Date()
    date.setDate(date.getDate() + count)
    return date.toDateString()
  }

  return (
    <div className='counter bb mb'>
      <div className='counterLine'>
        <input type="range" min='1' max='10' value={step}  onChange={(e) => changeStep(Number(e.target.value))}/>
        <span className='fb'>{step}</span>
      </div>
      <div className='counterLine mbm'>
        <button className='btn' onClick={() => setCount((s) => s - step)}>-</button>
        <input type="text" value={count} onChange={(e) => setCount(Number(e.target.value))}/>
        <button className='btn' onClick={() => setCount((s) => s + step)}>+</button>
      </div>
      <div className='dateString '>
        <span>{count === 0 ? `Today is ${today.toDateString()}` : `${Math.abs(count)} day${count === 1 || count === -1 ? '' : 's'} ${count < 1 ? 'ago' : ''} from today ${count < 1 ? 'was' : 'will be'} ${getDateDifference()}`}</span>
        <button className='btnB' onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  )
}