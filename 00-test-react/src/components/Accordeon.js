import { useState } from "react"

export default function Accordeon({ data }) {
  return (
    <div className="accordeon">
        {data.map((el, index) => <AccordeonItem title={el.title} text={el.text} num={index} key={el.title}/>)}
    </div>
  )
}

function AccordeonItem({ num, title, text }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleToggle() {
    setIsOpen(isOpen => !isOpen)
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 10 ? `0${ num + 1 }` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  )
}