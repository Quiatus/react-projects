import styles from './Sidebar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  // const navigate = useNavigate()
  return (
    <div className={styles.sidebar}>
      <Link to={"/"}> <Logo /> </Link>
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  )
}
