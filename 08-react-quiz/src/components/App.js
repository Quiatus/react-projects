import { useEffect, useReducer } from 'react'

import Header from "./Header";
import Main from "./Main";
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';

const initialState = {
  questions: [],
  status: 'loading', // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  points: 0,
  highscore: 0
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'dataReceived':
      return {...state, questions: action.payload, status: 'ready'}
    case 'dataFailed':
      return {...state, status: 'error'}
    case 'start':
      return {...state, status: 'active'}
    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state, 
        answer: action.payload, 
        points: action.payload === question.correctOption 
          ? state.points + question.points 
          : state.points
      }
    case 'nextQuestion': 
      return { ...state, index: state.index + 1, answer: null}
    case 'finish':
      return {...state, status: 'finished', highscore: state.points > state.highscore ? state.points : state.highscore}
    default: 
      throw new Error('Unknown action')
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(reducer, initialState)
  
  const numQuestions = questions.length
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dispatch({type: 'dataReceived', payload: data}))
      .catch(() => dispatch({type: 'dataFailed'}))
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {status === 'active' &&
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} answer={answer}/>
            <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
          </>
        }
        {status === 'finished' && <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore}/>}
      </Main>
    </div>
  );
}