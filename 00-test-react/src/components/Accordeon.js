import { useState } from "react"

export default function Accordeon({ data }) {
  const [curOpen, setCurOpen] = useState(null)

  return (
    <div className="accordion comp">
        {data.map((el, index) => <AccordeonItem curOpen={curOpen} onOpen={setCurOpen} title={el.title} num={index} key={el.title}>{el.text}</AccordeonItem>)}
    </div>
  )
}

function AccordeonItem({ num, title, curOpen, onOpen, children }) {
  const isOpen = num === curOpen

  function handleToggle() {
    onOpen(isOpen ? null : num)
  }

  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggle}>
      <p className="number">{num < 10 ? `0${ num + 1 }` : num + 1}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  )
}