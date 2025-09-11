import { useState } from "react";
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AppRouter from "./routes/App.routes";
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <AppRouter></AppRouter>
    </>
  )
}

export default App
