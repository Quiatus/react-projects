// import { useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import { useEffect } from "react"

// export default function ProtectedRoute({children}) {

//   const {isAutheticated} = useAuth()
//   const naviage = useNavigate()

//   useEffect(() => {
//     if(!isAutheticated) naviage("/")
//   }, [isAutheticated, naviage])

//   return isAutheticated ? children : null
// }

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
 
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
}
 
export default ProtectedRoute;