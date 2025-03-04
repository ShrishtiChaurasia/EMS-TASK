import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Addtasks } from "../api/taskapi";

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Low",
  });

  const navigate = useNavigate(); // ✅ For redirecting to Homepage

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await Addtasks(formData);
      navigate("/", { state: { successMessage: "Task added successfully!" } }); // ✅ Redirect with success message
    } catch (err) {
      console.log("An error occurred:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            name="description"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-semibold mb-2">
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={handleChange}
            name="status"
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="priority"
            className="block text-sm font-semibold mb-2"
          >
            Priority
          </label>
          <select
            id="priority"
            value={formData.priority}
            name="priority"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
