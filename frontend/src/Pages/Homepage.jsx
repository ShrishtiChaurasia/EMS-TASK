import axios from "axios";
import React, { useEffect, useState } from "react";
import Task from "../Components/Task";
import { useNavigate, useLocation } from "react-router-dom";
import FlashMessage from "../components/FlashMessage"; // ✅ Import FlashMessage Component

const Homepage = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(""); // ✅ Success message state
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Error message state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchData();

    // ✅ Check if there's a success message from the AddTask page
    if (location.state?.successMessage) {
      setMessage(location.state.successMessage);
      setTimeout(() => {
        setMessage("");
        navigate(".", { replace: true, state: {} }); // Remove message from history
      }, 5000);
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/");
      setData(res.data);
    } catch (err) {
      setErrorMessage("Failed to fetch tasks. Please try again.");
      console.log("Fetching error:", err);
      setTimeout(() => setErrorMessage(""), 5000); // Auto-remove error message
    }
  };

  const handleclick = () => {
    navigate(`/add`);
  };

  return (
    <div className="container mx-auto p-4 relative">
      {/* ✅ Flash Messages for Success and Error */}
      {message && (
        <FlashMessage message={message} onClose={() => setMessage("")} />
      )}
      {errorMessage && (
        <FlashMessage
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      <h1 className="text-3xl font-bold text-center mb-6">Our Tasks</h1>
      <button
        onClick={handleclick}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Add new Task
      </button>
      {data.length > 0 ? (
        <ul className="space-y-6">
          {data.map((item) => (
            <Task key={item._id} task={item} />
          ))}
        </ul>
      ) : (
        <p className="text-red-500 text-center">No tasks found</p>
      )}
    </div>
  );
};

export default Homepage;
