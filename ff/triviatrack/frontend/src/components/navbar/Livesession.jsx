import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Livesession = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${value}`);
  }, [navigate, value]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 p-4 mt-10">
      <div className="flex flex-col items-center justify-center max-w-4xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-lg p-8 space-y-8">
        
        <h1 className="text-3xl font-bold text-white mt-4 text-center">
          Join Session Name
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 w-full">
          <div className="flex-shrink-0">
            <img
              src="\src\assets\image.png"
              alt="Contact Support"
              className="w-80 md:w-80 h-auto"
            />
          </div>

          <input
            className="rounded-lg py-3 px-6"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Enter Room Id"
          />
          <button
            className="py-3 px-6 rounded-xl bg-blue-600 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 focus:outline-none transition-all"
            onClick={handleJoinRoom}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Livesession;
