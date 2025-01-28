import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useParams } from "react";
import "@fortawesome/fontawesome-free";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${
          import.meta.env.VITE_APP_BASEURL
        }/students/reset-password/${id}/${token}`,
        { password }
      )
      .then((res) => {
        console.log("Res", res.data);
        navigate("/students/login");
      })
      .catch((err) => console.log(err));
    console.log("Email:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 mt-10">
      <div className="w-full max-w-sm p-8 mb-20 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg shadow-black/10 text-white text-center animate-fade-in">
        <h2 className="text-2xl font-bold">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Password..."
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 px-4 rounded-full bg-white/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-bold text-lg hover:scale-105 transition-transform shadow-md"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
