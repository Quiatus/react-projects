import PageNav from "../components/PageNav"
import AppNav from "../components/AppNav"
import { Link } from "react-router-dom"

export default function Homepage() {
  return (
    <div>

      <PageNav />
      <AppNav />
      <h1 className="test">WorldWise</h1>

      <Link to='/app'>Go to app</Link>

    </div>
  )
}
