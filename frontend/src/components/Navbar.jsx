import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      toast.success("Logged out 👋");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed ❌");
    }
  };

  return (
    <div className="bg-white shadow mb-5">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">

        <h1 className="text-xl font-bold text-blue-600">
          Notes App
        </h1>

        <div className="flex gap-4 items-center">

          <Link
            to="/notes"
            className={`px-3 py-1 rounded 
              ${location.pathname === "/notes" ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
          >
            Notes
          </Link>

          <Link
            to="/login"
            className={`px-3 py-1 rounded 
              ${location.pathname === "/login" ? "bg-green-600 text-white" : "hover:bg-gray-200"}`}
          >
            Login
          </Link>

          <Link
            to="/register"
            className={`px-3 py-1 rounded 
              ${location.pathname === "/register" ? "bg-purple-600 text-white" : "hover:bg-gray-200"}`}
          >
            Register
          </Link>

          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
