import Counter from './Counter'; 
import Flashcards from './Flashcards';
import Accordeon from './Accordeon';
import TextBloc from './TextBloc';
import TipCalculator from './TipCalculator'
import Units from './Units';
import { text, faqs, questions } from './data';

export default function App() {
  return (
    <>
    <Header text='Testing React App'/>
    <div className='main'>
      <TextBloc data={text}/>
      <Accordeon data={faqs}/>
      <Counter />
      <Units />
      <Flashcards data={questions}/>
      <TipCalculator />
    </div>
    </>
  );
}

function Header({text}) {
  return <h1 className='h1'>{text}</h1>
}