export default function Options({question, dispatch, answer}) {
  const hasAnserred = answer !== null

  return (
    <div className="options">
        {question.options.map((option, index) => 
          <button 
            className={`btn btn-option ${index === answer ? 'answer' : ""} ${hasAnserred ? (index === question.correctOption ? "correct" : "wrong") : ""}`} 
            key={option} 
            disabled={hasAnserred}
            onClick={() => dispatch({type: 'newAnswer', payload: index})}>{option}
          </button>)}
      </div>
  )
}