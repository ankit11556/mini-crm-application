import { Outlet,Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const PrivateRoute = () =>{
  const {loading,isAutheticated} = useAuth()

  if (loading) return <p className="text-xl font-bold">Loading App...</p>

  return isAutheticated ? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRoute