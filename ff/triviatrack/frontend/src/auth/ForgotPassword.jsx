import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from "react";
import '@fortawesome/fontawesome-free';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_APP_BASEURL}/students/forgot-password`, { email })
      .then(res => {
        console.log("Res", res.data);
          navigate('/students/login'); 
      })
      .catch(err => console.log(err));
    console.log("Email:", email);
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 px-4 mt-10">
      <div className="w-full max-w-sm p-8 mb-20 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg shadow-black/10 text-white text-center animate-fade-in">
        
        <h2 className="text-2xl font-bold">Forgot Password</h2>


        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email..."
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 rounded-full bg-white/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
          />
          <button type="submit" className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-bold text-lg hover:scale-105 transition-transform shadow-md">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
