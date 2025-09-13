import { Home, UserPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";
const  Sidebar = ({ isOpen, toggleSidebar })=> {
  return (
    <aside
      className={`fixed top-16 left-0 h-screen w-64 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg transform transition-transform duration-300 z-40 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
    >
      <ul className="flex flex-col p-4 space-y-6">
        <li  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition">
          <Home size={20} />
          <span className="text-sm font-medium">
            <Link to="/">
            Dashboard
            </Link>
          </span>
        </li>

        
        <li  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition">
          <UserPlus size={20} />
          <span className="text-sm font-medium">
            <Link to="/add-customer">
             Add Customer
            </Link>
            </span>
        </li>

        <li  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 transition">
          <Users size={20} />
          <span className="text-sm font-medium">
           <Link to="/all-customer">
             All Customer
            </Link>
            </span>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar
