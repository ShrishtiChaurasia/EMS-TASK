import { useState } from "react";
import { Link } from "react-router-dom";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import "../Css/SignUp.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            Task Manager
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tasks" className="hover:text-gray-200">
                Tasks
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-200">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-200">
                Contact
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setSignUpOpen(true);
                  setLoginOpen(false); // ✅ Close login when opening sign-up
                }}
                className="hover:text-gray-300"
              >
                Sign In
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setLoginOpen(true);
                  setSignUpOpen(false); // ✅ Close sign-up when opening login
                }}
                className="hover:text-gray-300"
              >
                Login
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden bg-blue-700 p-4 mt-2 space-y-3">
            <li>
              <Link to="/" className="block hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tasks" className="block hover:text-gray-300">
                Tasks
              </Link>
            </li>
            <li>
              <Link to="/about" className="block hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block hover:text-gray-300">
                Contact
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setSignUpOpen(true);
                  setLoginOpen(false);
                  setIsOpen(false); // ✅ Close mobile menu
                }}
                className="block hover:text-gray-300"
              >
                Sign In
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setLoginOpen(true);
                  setSignUpOpen(false);
                  setIsOpen(false); // ✅ Close mobile menu
                }}
                className="block hover:text-gray-300"
              >
                Login
              </button>
            </li>
          </ul>
        )}
      </nav>

      {/* SignUp and Login Modals */}
      {signUpOpen && (
        <SignUp showPopUp={signUpOpen} setShowPopUp={setSignUpOpen} />
      )}
      {loginOpen && <Login showPopUp={loginOpen} setShowPopUp={setLoginOpen} />}
    </>
  );
};

export default Navbar;
