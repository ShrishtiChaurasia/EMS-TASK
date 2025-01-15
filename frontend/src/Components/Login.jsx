import React, { useState } from "react";
import "../Css/SignUp.css";
import { LoginUser } from "../api/Loginapi";
import { useNavigate } from "react-router-dom";

const Login = ({ showPopUp, setShowPopUp }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // Store validation errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(""); // Clear previous errors
      await LoginUser(formData);
      navigate("/", { state: { successMessage: "Login Successfully" } });
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };
  return (
    <div className="signup-container">
      {showPopUp && (
        <div className="popup-overlay">
          <div className="popup-box">
            <span className="close-btn" onClick={() => setShowPopUp(false)}>
              &times;
            </span>
            <h2>LogIn</h2>
            {error && <p className="error-message">{error}</p>}{" "}
            {/* Show error */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={formData.username}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
