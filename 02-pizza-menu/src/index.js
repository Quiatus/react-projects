import React from "react"
import ReactDOM from "react-dom/client"

function App() {
  return <div>
    <Header />
    <Menu />
    <Footer />
  </div>
}

function Header() {
  return <h1>Fast React Pizza Co.</h1>
}

function Menu() {
  return <div>
    <h2>Our menu</h2>
    <Pizza />
  </div>
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 12
  const closeHour = 22
  const isOpen = hour >= openHour && hour <= closeHour
  
  
  return <footer>{new Date().toLocaleDateString()} We're currently open</footer>
}

function Pizza() {
  return <div>
    <img src="pizzas/spinaci.jpg" alt="Pizza Spinazi"/>
    <h2>Pizza</h2>
    <p>Tomato, mozarella, spinach, and ricotta cheese</p>
  </div> 
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
  <App />
</React.StrictMode>)