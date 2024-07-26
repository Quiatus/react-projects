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
  return (
    <main className="menu">
      <h2>Our menu</h2>
      <ul className="pizzas">
        {pizzaData.map(pizza => <Pizza pizzaObj={pizza} key={pizza.name}/>)}
      </ul>
    </main>
  )
}

function Pizza(props) {
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
      {isOpen && <p>We are open.</p>}
    </footer>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
  <App />
</React.StrictMode>)