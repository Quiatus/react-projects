import Counter from './Counter'; 
import Flashcards from './Flashcards';
import Accordeon from './Accordeon';
import TextBloc from './TextBloc';
import TipCalculator from './TipCalculator'
import Units from './Units';
import TextExpander from './TextExpander';
import Currency from './Currency'
import Geoloc from './Geoloc';
import { text, faqs, questions, expanderText } from './data';

export default function App() {
  return (
    <>
    <Header text='Testing React App'/>
    <div className='main'>
      <TextBloc data={text}/>
      <Accordeon data={faqs}/>
      <Counter />
      <Currency/>
      <Geoloc />
      <Flashcards data={questions}/>
      <TipCalculator />
      <TextExpander data={expanderText}/>
      <Units />
    </div>
    </>
  );
}

function Header({text}) {
  return <h1 className='h1'>{text}</h1>
}