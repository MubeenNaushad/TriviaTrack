import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../context/UserContext"; // Ensure UserContext is set up
import "@fortawesome/fontawesome-free";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("Student");
  const { login } = useUser(); // Access the login function from UserContext
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/students/signup`, {
        email,
        password,
        name,
        userType,
      })
      .then((res) => {
        console.log("API Response:", res.data); // Debugging: Log the API response
        if (res.data.user) {
          // Safeguard against undefined user
          const user = res.data.user || {};
          login({
            name: user.name || "Unknown", // Fallback to "Unknown" if name is missing
            userType: user.userType || "Unknown",
            profilePhoto: user.photoUrl || "https://via.placeholder.com/40", // Default profile photo
          });
          alert("Verify your account before logging in.");
          navigate("/"); // Redirect to home after successful signup
        } else {
          alert("Signup failed");
        }
      })
      .catch((err) => {
        console.error("API Error:", err); // Log any API errors
        alert("An error occurred during signup. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 px-4 mt-16">
      <div className="w-full max-w-sm p-8 mb-20 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg shadow-black/100 text-gray-800 text-center animate-fade-in">
        <h2 className="text-2xl font-bold">Signup</h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setUserType("Student")}
            className={`px-4 py-2 border-2 border-black rounded-full ${
              userType === "Student"
                ? "bg-gray-800 text-white font-bold"
                : "text-black"
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setUserType("Teacher")}
            className={`px-4 py-2 border-2 border-gray-800 rounded-full ${
              userType === "Teacher"
                ? "bg-gray-800 text-white font-bold"
                : "text-black"
            }`}
          >
            Teacher
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Name..."
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full py-3 px-4 rounded-full bg-black/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-gray-800"
          />
          <input
            type="email"
            placeholder="Enter Email..."
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 rounded-full bg-black/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-gray-800"
          />
          <input
            type="password"
            placeholder="Enter Password..."
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 px-4 rounded-full bg-black/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-gray-800"
          />
          <button
            type="submit"
            className=" text-white w-full py-3 rounded-full bg-gray-700 font-bold text-lg hover:scale-105 transition-transform shadow-md"
          >
            Signup as {userType}
          </button>
        </form>

        <div className="flex justify-center mt-4">
          <button
            className="flex items-center justify-center bg-transparent border border-black text-black font-bold py-2 px-4 rounded hover:bg-white hover:text-gray-800 transition-all"
            onClick={() =>
              (window.location.href = `${
                import.meta.env.VITE_APP_BASEURL
              }/auth/google`)
            }
          >
            <i className="fab fa-google mr-2"></i> Continue with Google
          </button>
        </div>

        <p className="">
          Already have an account?{" "}
          <Link
            to="/students/login"
            className="font-bold underline hover:text-blue-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
