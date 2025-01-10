import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Student");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/students/signup`, {
        name,
        email,
        password,
        userType,
      })
      .then((res) => navigate("/login"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 px-4 mt-10">
      <div className="flex justify-center items-center w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg shadow-black/10 text-white text-center animate-fade-in">
        <form onSubmit={handleSubmit} className="w-full">
          <h2 className="text-2xl font-bold mb-5">Register</h2>

          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full py-3 px-4 mb-2.5 rounded-full bg-white/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
            required
          >
            <option value="hint" disabled>Select</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>

          <input
            type="text"
            placeholder="Enter Username..."
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full py-3 px-4 mb-2.5 rounded-full bg-white/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
          />
          <input
            type="email"
            placeholder="Enter Email..."
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 mb-2.5 rounded-full bg-white/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Enter Password..."
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 px-4 mb-4 rounded-full bg-white/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
          />

          <button type="submit" className="w-full py-3 mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg transition-transform duration-300 hover:scale-105 shadow-md">
            Register
          </button>

          <div className="flex justify-center mt-4">
            <button
              onClick={() => {}} // Placeholder for your actual Google sign-in handler
              className="flex items-center justify-center bg-transparent border border-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all hover:bg-white hover:text-blue-600"
            >
              <i className="fab fa-google mr-2"></i> Continue with Google
            </button>
          </div>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-white font-bold underline transition-colors hover:text-blue-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
