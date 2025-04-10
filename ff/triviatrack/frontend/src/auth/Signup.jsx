import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { useUser } from "../context/UserContext"; 
import "@fortawesome/fontawesome-free";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("Student");
  const [errors,setErrors]=useState({})
  const { login } = useUser(); 
  const navigate = useNavigate();

const validateName = (name) => /^[^\d][\w\s]{3,30}$/.test(name);


const validateEmail = (email) => /^[^\d][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors={};
    if(!validateName(name)){
      validationErrors.name="Name must not start with a digit & have greater than 3 characters.";
    }
    if(!validateEmail(email)){
      validationErrors.email="Email must not start with a digit";
    }
    if(!validatePassword(password)){
      validationErrors.password="Password must have atleast 8 character containing one digit and one upper case"
    }
    if(Object.keys(validationErrors).length>0){
      setErrors(validationErrors);
      return;

    }
    setErrors({})
    axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/students/signup`, {
        email,
        password,
        name,
        userType,
      })
      .then((res) => {
        console.log("API Response:", res.data); 
        if (res.data.user) {
          
          const user = res.data.user || {};
          login({
            name: user.name || "Unknown", 
            userType: user.userType || "Unknown",
            profilePhoto: user.photoUrl || "https://via.placeholder.com/40", 
          });
          alert("Verify your account before logging in.");
          navigate("/"); 
        } else {
          alert("Signup failed");
        }
      })
      .catch((err) => {
        console.error("API Error:", err); 
        alert("An error occurred during signup. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 px-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg shadow-black/100 text-gray-800 text-center animate-fade-in mt-28">
        <h2 className="text-2xl font-bold">Create an account</h2>
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
          {errors.name && <p className="text-red-300 text-sm text-left pl-3 mb-3">{errors.name}</p>}
          <input
            type="email"
            placeholder="Enter Email..."
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 rounded-full bg-black/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-gray-800"
          />
          {errors.email && <p className="text-red-300 text-sm text-left pl-3 mb-3">{errors.email}</p>}
          <input
            type="password"
            placeholder="Enter Password..."
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 px-4 rounded-full bg-black/20 text-black placeholder-gray-800 focus:bg-white/30 focus:outline-none focus:ring-4 focus:ring-gray-800"
          />
          {errors.password && <p className="text-red-300 text-sm text-left pl-3 mb-3">{errors.password}</p>}
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
