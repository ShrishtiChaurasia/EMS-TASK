import axios from "axios";
import React, { useEffect, useState } from "react";
import Task from "../Components/Task";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/");
      setData(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("fetching err", err);
    }
  };

  const handleclick = () => {
    navigate(`/add`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Our Tasks</h1>
      {data.length > 0 ? (
        <ul className="space-y-6">
          <button
            onClick={handleclick}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Add new Task
          </button>
          {data.map((item) => {
            return <Task key={item._id} task={item} />;
          })}
        </ul>
      ) : (
        <p className="text-red-500 text-center">No tasks found</p>
      )}
    </div>
  );
};

export default Homepage;
