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

      <>  
        <p>
          Authentic Italian cuisine. Six creative dishes to choose from. All from our stone oven, all organic, all delicious. 
        </p>

        <ul className="pizzas">
          {pizzaData.map(pizza => <Pizza pizzaObj={pizza} key={pizza.name}/>)}
        </ul>
      </>
      ) : <p>We're still working on our menu. Please check back later.</p>}
    </main>
  )
}

function Pizza({pizzaObj}) {
  return (
    <li className={`pizza ${ pizzaObj.soldOut ? 'sold-out' : ''}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name}/>
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? 'SOLD OUT' : pizzaObj.price}</span>
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
        : <p>We are happy to welcome you from {openHour}:00 to {closeHour}:00.</p>}
    </footer>
  )
}

function Order({ closeHour }) {
  return (
    <div className="order">
      <p>We are open until {closeHour}:00. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
  <App />
</React.StrictMode>)