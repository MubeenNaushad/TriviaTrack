import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";

const Livesession = () => {
  const { user } = useUser();
  const [value, setValue] = useState();
  const [leftMeeting, setLeftMeeting] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(() => {
    if (value.trim().length === 0) {
      alert("Please enter a room ID.");
      return;
    }

    navigate(`/room/${value}`);
  }, [navigate, value]);

  return (
    <>
      {user ? (
        <div className="mt-20 flex items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="flex flex-col items-center justify-center max-w-4xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mt-4 text-center">
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
                disabled={!value?.trim()}
                className={`w-full py-3 px-8 rounded-full font-semibold text-lg shadow-md transition-all ${value?.trim()
                    ? "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    : "bg-gray-400 text-gray-100 cursor-not-allowed"
                  }`}
                onClick={handleJoinRoom}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20">
          <h1 className="text-center font-bold text-2xl mt-32">
            SignUp or Login to access this Feature.
          </h1>
        </div>
      )}

      {leftMeeting && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white p-3 rounded-md shadow-lg">
          You left the meeting.
        </div>
      )}
    </>
  );
};

export default Livesession;
