import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

const text = [
  {
    title: 'Title 1',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, similique.'
  },
  {
    title: 'Title 2',
    text: 'Pellentesque ut mi lorem. Vivamus sit amet aliquam ligula. Mauris blandit erat ac placerat dignissim.'
  },
  {
    title: 'Title 3',
    text: 'Maecenas eu purus sit amet enim dignissim viverra. Sed sollicitudin risus eu finibus faucibus. Donec porttitor justo vulputate augue eleifend placerat.'
  },
  {
    title: 'Title 4',
    text: 'Morbi feugiat quam a malesuada rutrum.'
  },
]

function App() {
  return (
    <Main />
  );
}

function Main() {
  return (
    <main>
      <Header text='Testing React App'/>
      <div className='bb mb'>
        {
          text.map(item => (<TextBloc title={item.title} text={item.text} />))
        }
      </div>
      <Counter />
    </main>
  )
}

function Header({text}) {
  return <h1 className='h1'>{text}</h1>
}

function TextBloc({ title, text }) {
  return (
    <div className='textBlock'>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

function Counter() {
  const today = new Date()

  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)

  function changeStep(type) {
    if (type === 'dec' && step > 1) setStep((s) => s - 1)
    if (type === 'inc') setStep((s) => s + 1)
  }

  function changeCount(type) {
    if (type === 'dec') setCount((s) => s - step)
    if (type === 'inc') setCount((s) => s + step)
  }

  function getDateDifference() {
    const date = new Date()
    date.setDate(date.getDate() + count)
    return date.toDateString()
  }

  return (
    <div className='counter bb'>
      <div className='counterLine'>
        <button className='btn' onClick={() => changeStep('dec')}>-</button>
        <button className='btn' onClick={() => changeStep('inc')}>+</button>
        <span>Step:</span><span className='fb'>{step}</span>
      </div>
      <div className='counterLine mbm'>
        <button className='btn' onClick={() => changeCount('dec')}>-</button>
        <button className='btn' onClick={() => changeCount('inc')}>+</button>
        <span>Count:</span><span className='fb'>{count}</span>
      </div>
      <div className='dateString '>
        <span>{count === 0 ? `Today is ${today.toDateString()}` : `${Math.abs(count)} day${count === 1 || count === -1 ? '' : 's'} ${count < 1 ? 'ago' : ''} from today ${count < 1 ? 'was' : 'will be'} ${getDateDifference()}`}</span>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
