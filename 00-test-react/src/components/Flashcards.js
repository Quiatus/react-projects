import { useState } from "react";

export default function Flashcards({data}) {
  const [selectedID, setSelectedID] = useState(null)

  function handleClick(id) {
    setSelectedID(id !== selectedID ? id : null)
  }

  return (
    <div className="flashcards comp">
      {data.map(question => 
        <div 
          className={`card ${question.id === selectedID ? 'selected' : ''}`} 
          key={question.id}
          onClick={() => handleClick(question.id)}>
            {
              question.id === selectedID ? question.answer : question.question
            }
        </div>)}
    </div>

  )
}