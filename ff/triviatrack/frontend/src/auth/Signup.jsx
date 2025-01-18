import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(""); // Default empty
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, password, userType }); // Debugging log
    axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/students/signup`, {
        name,
        email,
        password,
        userType,
      })
      .then((res) => navigate("/students/login"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 mt-10">
      <div className="flex justify-center items-center w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl mb-20 p-8 shadow-lg shadow-black/10 text-white text-center animate-fade-in">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-5">Register</h2>

          <select
            value={userType}
            onChange={(e) => {
              setUserType(e.target.value);
              console.log("Selected userType:", e.target.value); // Debugging log
            }}
            className="w-full py-3 px-4 mb-2.5 rounded-full bg-white/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
            required
          >
            <option disabled value="">
              Select
            </option>
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

          <button
            type="submit"
            className="w-full py-3 mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-lg transition-transform duration-300 hover:scale-105 shadow-md"
          >
            Register
          </button>

          <div className="text-center pt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-white font-bold underline transition-colors hover:text-blue-300"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
