import React, { useState } from "react";
import "../Css/SignUp.css";
import { AddUser } from "../api/AddUser";
import { useNavigate } from "react-router-dom";

const SignUp = ({ showPopUp, setShowPopUp }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
      const response = await AddUser(formData);
      if (response.status === 201) {
        // Check if user added successfully
        navigate("/", { state: { successMessage: "User Added Successfully" } }); // Redirect to homepage
      }
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
            <h2>Sign Up</h2>
            {error && <p className="error-message">{error}</p>}
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
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
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

export default SignUp;
