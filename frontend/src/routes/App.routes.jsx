import {Routes, Route} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";

const AppRouter = ()=>{
  return(
    <>
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
    </>
  )
}

export default AppRouter