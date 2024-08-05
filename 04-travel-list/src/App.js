import {useState} from 'react'

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true }
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item])
  }

  return (
    <div className="app">
      <Logo /> 
      <Form onAddItems={handleAddItem}/> 
      <PackingList items={items}/> 
      <Stats /> 
    </div>
  )
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItems }) {
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

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {
          items.map(item => (<Item item={item} key={item.id} />))
        }
      </ul>
    </div>
  )
}

function Item({ item }) {
  return (
    <li>
      <span style={ item.packed ? { textDecoration: "line-through" } : {} }>{item.quant} {item.descr}</span>
      <button>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        You have X items on your list and you already packed X (X%)
      </em>
    </footer>
  )
}