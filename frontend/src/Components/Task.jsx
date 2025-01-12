import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Icons for buttons
import { deleteTask } from "../api/Deletetaskapi";
import { useNavigate } from "react-router-dom";

const TaskItem = ({ task }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    const res = await deleteTask(id);

    if (res.success) {
      alert(res.message);
      window.location.href = "/";
    } else {
      alert(res.err);
    }
  };

  const handleDel = () => {
    navigate(`/${task._id}/edit`);
  };

  return (
    <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg border border-gray-200 my-2">
      {/* Task Info */}
      <div>
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-gray-600 text-sm">{task.description}</p>
        <p
          className={`text-sm ${
            task.status === "completed" ? "text-green-500" : "text-red-500"
          }`}
        >
          {task.status}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {/* Edit Button */}
        <button
          onClick={handleDel}
          className="text-blue-500 hover:text-blue-700 transition"
        >
          <FaEdit size={18} />
        </button>

        {/* Delete Button */}
        <button
          onClick={(e) => handleDelete(e, task._id)}
          className="text-red-500 hover:text-red-700 transition"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
