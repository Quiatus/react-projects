import React from 'react';
import ReactDOM from 'react-dom/client';
import Counter from './components/Counter'; 
import Flashcards from './components/Flashcards';
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
      <Flashcards />
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
