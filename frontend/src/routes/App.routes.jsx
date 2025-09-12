import {Routes, Route} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddCustomer from "../pages/AddCustomer";
import AllCustomers from "../pages/AllCustomers";

const AppRouter = ()=>{
  return(
    <>
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>

      <Route path="/add-customer" element={<AddCustomer/>}></Route>
      <Route path="/all-customer" element={<AllCustomers/>}></Route>
    </Routes>
    </>
  )
}

export default AppRouter