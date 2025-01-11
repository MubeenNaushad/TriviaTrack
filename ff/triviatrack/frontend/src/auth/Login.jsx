import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from "react";
import '@fortawesome/fontawesome-free';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_APP_BASEURL}/students/login`, { email, password, userType })
      .then(res => {
        console.log("Res", res.data);
        if (res.data.Login) {
          navigate('/');
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err));
    console.log("Email:", email, "Password:", password, "UserType:", userType);
  };

  const toggleUserType = () => {
    const newType = userType === "Student" ? "Teacher" : "Student";
    setUserType(newType);
    console.log("Toggled UserType:", newType);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 px-4 mt-10">
      <div className="w-full max-w-sm p-8 mb-20 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg shadow-black/10 text-white text-center animate-fade-in">
        
        <h2 className="text-2xl font-bold">Welcome To TriviaTrack</h2>

        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => setUserType("Student")}
            className={`px-4 py-2 border-2 border-white rounded-full ${userType === "Student" ? 'bg-white text-blue-800 font-bold' : 'text-white'}`}
          >
            Student
          </button>
          <button 
            onClick={() => setUserType("Teacher")}
            className={`px-4 py-2 border-2 border-white rounded-full ${userType === "Teacher" ? 'bg-white text-blue-800 font-bold' : 'text-white'}`}
          >
            Teacher
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email..."
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 rounded-full bg-white/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Enter Password..."
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 px-4 rounded-full bg-white/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
          />
          <button type="submit" className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-bold text-lg hover:scale-105 transition-transform shadow-md">
            Login as {userType}
          </button>
        </form>

        <a href="#" className="text-sm underline hover:text-blue-300">Forgot Password?</a>

        <div className="flex justify-center mt-4">
          <button
            className="flex items-center justify-center bg-transparent border border-white text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-blue-600 transition-all"
          >
            <i className="fab fa-google mr-2"></i> Continue with Google
          </button>
        </div>

        <p className="">
          Don't have an account? <Link to="/students/signup" className="font-bold underline hover:text-blue-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
