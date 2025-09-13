import {Routes, Route} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddCustomer from "../pages/AddCustomer";
import AllCustomers from "../pages/AllCustomers";
import CustomerDetailPage from "../pages/CustomerDetailPage";
import AddLead from "../pages/AddLead";

const AppRouter = ()=>{
  return(
    <>
    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>

      <Route path="/add-customer" element={<AddCustomer/>}></Route>
      <Route path="/all-customer" element={<AllCustomers/>}></Route>
      <Route path="/customer-detail-page/:id" element={<CustomerDetailPage/>}></Route>
      <Route path="/customer-detail-page/:id/add-lead" element={<AddLead/>}></Route>
    </Routes>
    </>
  )
}

export default AppRouter