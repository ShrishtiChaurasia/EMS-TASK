import React from "react";

const Error = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold text-red-600">
          Oops! Something went wrong.
        </h2>
        <p className="text-xl text-gray-700 mt-4">
          We couldn't find what you were looking for. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default Error;
