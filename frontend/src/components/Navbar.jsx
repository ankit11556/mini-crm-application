const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <div className="flex items-center gap-4">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={toggleSidebar}
              className="md:hidden text-white text-2xl font-bold"
            >
              ☰
            </button>
            <div className="flex-shrink-0 text-white font-bold text-xl tracking-wide">
              Mini CRM
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-white text-sm font-medium">
              Hello, User
            </span>
            <button className="px-4 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
              Login
            </button>
          </div>

        </div>
      </div>
    </nav>
  )
}
export default Navbar