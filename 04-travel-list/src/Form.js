import {useState} from 'react'

export default function Form({ onAddItems }) {
  const [descr, setDescr] = useState('');
  const [quant, setQuant] = useState(1);

  function handleSubmit(e) {
    e.preventDefault()

    if (!descr) return
    
    const newItem = {descr, quant, packed: false, id: Date.now()}
    onAddItems(newItem)

    setDescr('')
    setQuant(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      
      <select value={quant} onChange={(e) => setQuant(Number(e.target.value))}>
        {Array.from({length: 20}, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
      </select>

      <input type="text" placeholder="Item..." value={descr} onChange={(e) => setDescr(e.target.value)}/>
      <button>Add</button>
    </form>
  )
}