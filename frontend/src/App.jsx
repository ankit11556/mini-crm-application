import { useState } from "react";
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main content placeholder */}
      <main className="ml-0 md:ml-64 p-4">
        <h1 className="text-2xl font-bold">Dashboard / Page Content</h1>
      </main>
    </>
  )
}

export default App
