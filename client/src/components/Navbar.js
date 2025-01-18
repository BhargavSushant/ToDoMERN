import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-gray-700">
          TodoApp
        </Link>
        <button
          className="md:hidden block text-gray-700"
          onClick={() => setOpen(!open)}
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path d="M4 5h16M4 12h16M4 19h16" />
          </svg>
        </button>

        <div
          className={`${
            open ? "" : "hidden"
          } w-full md:flex md:items-center md:w-auto`}
        >
          <ul className="md:flex md:space-x-4 mt-2 md:mt-0">
            {token ? (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 text-gray-700 hover:bg-gray-200 rounded"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
