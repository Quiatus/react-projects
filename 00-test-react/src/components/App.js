import Counter from './Counter'; 
import Flashcards from './Flashcards';
import Accordeon from './Accordeon';
import TextBloc from './TextBloc';
import { text, faqs, questions } from './data';

export default function App() {
  return (
    <>
    <Header text='Testing React App'/>
    <div className='main'>
      <TextBloc data={text}/>
      <Accordeon data={faqs}/>
      <Counter />
      <Flashcards data={questions}/>
    </div>
    </>
  );
}

function Header({text}) {
  return <h1 className='h1'>{text}</h1>
}