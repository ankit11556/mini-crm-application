import {  createContext, useContext, useEffect, useState } from "react";
import { checkAuthApi } from "../services/AuthApi";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
  const [isAutheticated,setIsAutheticated] = useState(false);
  const [loading,setLoading] = useState(true);
  const [user,setUser] = useState(null)   

  useEffect(()=>{
    const checkAuth = async () => {
      try {
        const res = await checkAuthApi() 
        setIsAutheticated(true)
        setUser(res.data.user)
      } catch (error) {
        setIsAutheticated(false)
        setUser(null)
      } finally{
        setLoading(false)
      }
    }
    checkAuth()
  },[])

  return(
    <AuthContext.Provider value={{isAutheticated,setIsAutheticated,user,setUser,loading}}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth =()=> useContext(AuthContext)