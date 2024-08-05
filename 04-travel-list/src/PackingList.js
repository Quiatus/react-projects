import {useState} from 'react'
import Item from './Item'

export default function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState('input')

  let sortedItems

  if (sortBy === 'input') sortedItems = items

  if (sortBy === 'alpha') sortedItems = items.slice().sort((a, b) => a.descr.localeCompare(b.descr))

  if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))  
    
  return (
    <div className="list">
      <ul>
        {
          sortedItems.map(item => (<Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>))
        }
      </ul>

      <div className='actions'>
        Sort:
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">By input order</option>
          <option value="alpha">Alphabetically</option>
          <option value="packed">Status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  )
}