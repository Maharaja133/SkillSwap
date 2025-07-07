import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaSignOutAlt,
  FaHome,
  FaUser,
  FaUserFriends,
  FaComments,
  FaBell,
  FaSearch,
} from "react-icons/fa";

export default function DashboardLayout() {
  const { user, logout } = useAuth();

  const navItems = [
    { to: "/dashboard", icon: <FaHome />, label: "Home" },
    { to: "/dashboard/profile", icon: <FaUser />, label: "Profile" },
    { to: "/dashboard/sessions", icon: <FaUserFriends />, label: "Sessions" },
    { to: "/dashboard/discover", icon: <FaSearch />, label: "Discover" },
    { to: "/dashboard/messages", icon: <FaComments />, label: "Messages" },
    { to: "/dashboard/notifications", icon: <FaBell />, label: "Notifications" },
  ];

  return (
    <div className="min-h-screen flex">
    <aside className="w-64 bg-gray-900 text-white flex flex-col border-r border-gray-700">
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">SkillSwap</h1>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-800 ${
                    isActive ? "bg-gray-800 text-indigo-400 font-medium" : "text-gray-300"
                  }`
                }
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <main className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      <header className="bg-white border-b border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome back, <span className="text-indigo-600">{user?.name}</span>
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <div className="relative">
              <img 
                src={user?.avatar || '/default-avatar.png'} 
                alt={user?.name}
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <Outlet />
      </div>
    </main>
  </div>
  );
}
