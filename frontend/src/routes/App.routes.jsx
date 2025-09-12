import {Routes, Route} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddCustomer from "../pages/AddCustomer";

const AppRouter = ()=>{
  return(
    <>
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>

      <Route path="/add-customer" element={<AddCustomer/>}></Route>
    </Routes>
    </>
  )
}

export default AppRouter