import {useEffect, useState} from 'react'

export default function Units() {

  const [inputCurr, setInputCurr] = useState(0)
  const [inpSelect, setInpSelect] = useState('USD')
  const [outSelect, setOutSelect] = useState('USD')
  const [outCurr, setOutCurr] = useState("")

  useEffect(() => {

    if (inpSelect === outSelect) {
      setOutCurr(inputCurr)
      return
    }
  
    if (isNaN(inputCurr) || !inputCurr) {
      setOutCurr(0)
      return
    }

    async function convert() {
      setOutCurr('Calculating...')
      const req = await fetch(`https://api.frankfurter.app/latest?amount=${inputCurr}&from=${inpSelect}&to=${outSelect}`)
      const data = await req.json()
      setOutCurr(data.rates[outSelect])
    }

    convert()
  }, [inputCurr, inpSelect, outSelect])

  return <div className="comp curr">
    <div>
      <input type="text" onChange={(e) => setInputCurr(Number(e.target.value))}/>
      <select value={inpSelect} onChange={e => setInpSelect(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={outSelect} onChange={e => setOutSelect(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
    </div>
    <p>{outCurr + ' ' + outSelect}</p>
  </div>
}