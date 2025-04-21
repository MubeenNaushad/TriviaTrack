import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import { motion } from "framer-motion";

const Livesession = () => {
  const { user } = useUser();
  const [value, setValue] = useState("");
  const [leftMeeting, setLeftMeeting] = useState(false);
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(() => {
    if (value.trim().length === 0) {
      return;
    }

    navigate(`/room/${value}`);
  }, [navigate, value]);

  return (
    <>
      {user ? (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
          <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center p-8 md:p-10 gap-8 md:gap-12">
            {/* Left Side - Image */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src="/src/assets/image.png"
                alt="Join Session"
                className="w-full h-auto max-w-sm md:max-w-md rounded-2xl"
              />
            </div>

            {/* Right Side - Form */}
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Join a Live Session
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Enter your Room ID below to join the live session.
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter Room ID"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />

                <button
                  onClick={handleJoinRoom}
                  disabled={!value.trim()}
                  className={`w-full py-3 rounded-full font-semibold text-lg shadow-md transition-all ${value.trim()
                      ? "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      : "bg-gray-400 text-gray-100 cursor-not-allowed"
                    }`}
                >
                  Join Session
                </button>
              </div>

              {leftMeeting && (
                <p className="text-center text-yellow-600 mt-4">
                  You left the meeting.
                </p>
              )}
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <h1 className="text-center font-bold text-2xl">
            Please Sign Up or Log In to access this feature.
          </h1>
        </div>
      )}
    </>
  );
};

export default Livesession;
