import { Link } from "react-router-dom"

export default function Button({children, disabled, to, type, onClick}) {
  
  const base = "text-sm bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2"

  const styles = {
    primary: base + ' px-4 py-3 sm:px-6 sm:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-s',
    secondary: "px-4 py-2.5 md:px-6 md:py-3.5 text-sm border-2 border-stone-300 uppercase font-semibold text-stone-400 inline-block tracking-wide rounded-full hover:bg-stone-300 hover:text-stone-800 transition-colors duration-300 disabled:cursor-not-allowed focus:outline-none focus:ring focus:text-stone-800 focus:ring-stone-200 focus:ring-offset-2"
  }

  if(to) {
    return <Link to={to} className={styles[type]}>{children}</Link>
  }

  if(onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}> {children}</button>
    )
  }

  return (
    <button disabled={disabled} className={styles[type]}> {children}</button>
  )
}
