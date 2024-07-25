import React from "react"
import ReactDOM from "react-dom/client"
import './index.css'

function App() {
  return <div className="container">
    <Header />
    <Menu />
    <Footer />
  </div>
}

function Header() {
  //const h1Style = { color: "red", fontSize: '48px', textTransform: 'uppercase' }
  return <header className="header">
    <h1 /* style={h1Style} */>Fast React Pizza Co.</h1>
  </header>
}

function Menu() {
  return <main className="menu">
    <h2>Our menu</h2>
    <Pizza 
      name="Pizza Spinaci" 
      ingredients="Tomato, mozarella, spinach, and ricotta cheese" 
      photoName="pizzas/spinaci.jpg" 
      price={10}
    />

    <Pizza 
      name="Pizza Funghi" 
      ingredients="Tomato, mushrooms" 
      photoName="pizzas/funghi.jpg" 
      price={12}
    />
  </main>
}

function Pizza(props) {
  return <div className="pizza">
    <img src={props.photoName} alt={props.name}/>
    <div>
      <h3>{props.name}</h3>
      <p>{props.ingredients}</p>
      <span>{props.price}</span>
    </div>
  </div> 
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 12
  const closeHour = 22
  const isOpen = hour >= openHour && hour <= closeHour
  
  return <footer>{new Date().toLocaleDateString()} {isOpen ? `We're currently open` : `Sorry, we're closed.`}</footer>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
  <App />
</React.StrictMode>)