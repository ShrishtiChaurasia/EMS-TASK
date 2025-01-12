import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Update } from "../api/Updatetaskapi";

const EditTask = () => {
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Low",
  });

  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Update(editForm, id);
      alert("Task edit successfully!!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Yourw Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={editForm.title}
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
            value={editForm.description}
            onChange={handleChange}
            id="description"
            name="description"
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
            onChange={handleChange}
            id="status"
            value={editForm.status}
            name="status"
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
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
            onChange={handleChange}
            id="priority"
            value={editForm.priority}
            name="priority"
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
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

export default EditTask;
