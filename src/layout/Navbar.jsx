import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Home,
  Wallet,
  PlusCircle,
  BarChart,
  User,
  Settings,
  Phone,
  Star,
  LogIn,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const links = [
    { name: "Home", icon: <Home size={18} />, to: "/" },
    { name: "Expense", icon: <Wallet size={18} />, to: "/expense" },
    { name: "Add New", icon: <PlusCircle size={18} />, to: "/add" },
    { name: "Analysis", icon: <BarChart size={18} />, to: "/analysis" },
    { name: "Profile", icon: <User size={18} />, to: "/profile" },
    { name: "Settings", icon: <Settings size={18} />, to: "/settings" },
    { name: "Contact", icon: <Phone size={18} />, to: "/contact" },
    { name: "Rating", icon: <Star size={18} />, to: "/rating" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 z-40 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <span className="text-lg font-bold">Menu</span>
        <button onClick={toggleSidebar} aria-label="Close Sidebar">
          <X className="text-white" />
        </button>
      </div>
      <nav className="mt-10 px-4 flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800"
            onClick={() => toggleSidebar()}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

const Navbar = ({ toggleSidebar, isLoggedIn, onLogin, onLogout }) => (
  <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
    <div className="flex items-center gap-3">
      <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
        <Menu />
      </button>
      <div>
        <img className="w-12 h-12 rounded-full" src="/assets/logo/XPENSO.png" alt="" />
      </div>
      <span className="text-xl font-bold">Expenso</span>
    </div>
    <div>
      {isLoggedIn ? (
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded"
        >
          <LogOut size={16} />
          Logout
        </button>
      ) : (
        <button
          onClick={onLogin}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded"
        >
          <LogIn size={16} />
          Login
        </button>
      )}
    </div>
  </div>
);

const NavbarWithSidebar = () => {
  const { login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogin = () => {
    // setIsLoggedIn(true)
    navigate("/pages/user/login");
  };
  const handleLogout = () => logout();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="min-h-screenn flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Navbar
          toggleSidebar={toggleSidebar}
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        {/* <main className="p-6 mt-4 flex-1 overflow-auto">
          <h1 className="text-2xl font-semibold">Welcome to ExpenseApp</h1>
         
        </main> */}
      </div>
    </div>
  );
};

export default NavbarWithSidebar;
