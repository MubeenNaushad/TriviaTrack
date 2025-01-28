import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import "@fortawesome/fontawesome-free";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [errors, setErrors] = useState({}); // State for validation errors
  const navigate = useNavigate();

  // Validation functions
  const validateName = (name) => /^[^\d][\w\s]*$/.test(name); // No starting number
  const validateEmail = (email) =>
    /^[^\d][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email); // Valid email, no number start
  const validatePassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password); // Strong password

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!validateName(name)) {
      validationErrors.name = "Name must not start with a number.";
    }
    if (!validateEmail(email)) {
      validationErrors.email = "Invalid email. Email must not start with a number.";
    }
    if (!validatePassword(password)) {
      validationErrors.password =
        "Password must be at least 8 characters, contain one uppercase letter, and one digit.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Show validation errors
      return;
    }

    // Clear errors and submit if validation passes
    setErrors({});
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
    <div className="mt-16 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600">
      <div className="flex justify-center items-center w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl mb-20 p-8 shadow-lg shadow-black/10 text-white text-center animate-fade-in">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-5">Register</h2>

          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
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
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full py-3 px-4 mb-2.5 rounded-full bg-white/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
          />
          {errors.name && <p className="text-red-300 text-sm text-left pl-3 mb-3">{errors.name}</p>}

          <input
            type="email"
            placeholder="Enter Email..."
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 mb-2.5 rounded-full bg-white/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
          />
          {errors.email && <p className="text-red-300 text-sm text-left pl-3 mb-3">{errors.email}</p>}

          <input
            type="password"
            placeholder="Enter Password..."
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 px-4 mb-4 rounded-full bg-white/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
          />
          {errors.password && (
            <p className="text-red-300 text-sm text-left pl-3 mb-3">{errors.password}</p>
          )}

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
