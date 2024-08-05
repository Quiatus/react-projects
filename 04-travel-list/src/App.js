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

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item))
  }

  return (
    <div className="app">
      <Logo /> 
      <Form onAddItems={handleAddItem}/> 
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}/> 
      <Stats items={items}/> 
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {
          items.map(item => (<Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>))
        }
      </ul>
    </div>
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)}/>
      <span style={ item.packed ? { textDecoration: "line-through" } : {} }>{item.quant} {item.descr}</span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats({items}) {
  if (!items.length) 
  return (
    <p className='stats'>
      <em>Start adding some items to your packing list 🚀</em> 
    </p>
  )

  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length
  const percentage = Math.round(numPacked / numItems * 100)

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? 'You got everything! Ready to go ✈️' : `You have ${numItems} ${numItems === 1 ? 'item' : 'items'} on your list and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  )
}