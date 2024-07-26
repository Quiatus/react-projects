import React from "react"
import ReactDOM from "react-dom/client"
import './index.css'
import { pizzaData } from "./data.js";

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  )
}

function Header() {
  //const h1Style = { color: "red", fontSize: '48px', textTransform: 'uppercase' }
  return (
    <header className="header">
      <h1 /* style={h1Style} */>Fast React Pizza Co.</h1>
    </header>
  )
}

function Menu() {
  const numPizzas = pizzaData.length

  return (
    <main className="menu">
      <h2>Our menu</h2>
      {numPizzas > 0 ? (
        <ul className="pizzas">
          {pizzaData.map(pizza => <Pizza pizzaObj={pizza} key={pizza.name}/>)}
        </ul>
      ) : <p>We're still working on our menu. Please check back later.</p>}
    </main>
  )
}

function Pizza(props) {
  if (props.pizzaObj.soldOut) return null

  return (
    <li className="pizza">
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name}/>
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>{props.pizzaObj.price}</span>
      </div>
    </li> 
  )
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 12
  const closeHour = 22
  const isOpen = hour >= openHour && hour <= closeHour
  
  return (
    <footer>
      {isOpen 
        ? <Order closeHour={closeHour} />
        : <p>We are happy to welcome you between {openHour}:00 and {closeHour}:00.</p>}
    </footer>
  )
}

function Order(props) {
  return (
    <div className="order">
      <p>We are open until {props.closeHour}:00. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
  <App />
</React.StrictMode>)