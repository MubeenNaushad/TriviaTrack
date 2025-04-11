"use client"

import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { useUser } from "../context/UserContext"
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [userType, setUserType] = useState("Student")
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useUser()
  const navigate = useNavigate()

  const validateName = (name) => /^[^\d][\w\s]{3,30}$/.test(name)
  const validateEmail = (email) => /^[^\d][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)

  axios.defaults.withCredentials = true

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = {}

    if (!validateName(name)) {
      validationErrors.name = "Name must not start with a digit & have greater than 3 characters."
    }
    if (!validateEmail(email)) {
      validationErrors.email = "Email must not start with a digit"
    }
    if (!validatePassword(password)) {
      validationErrors.password = "Password must have at least 8 characters with one digit and one uppercase letter"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/students/signup`, {
        email,
        password,
        name,
        userType,
      })
      .then((res) => {
        console.log("API Response:", res.data)
        if (res.data.user) {
          const user = res.data.user || {}
          login({
            name: user.name || "Unknown",
            userType: user.userType || "Unknown",
            profilePhoto: user.photoUrl || "https://via.placeholder.com/40",
          })
          alert("Verify your account before logging in.")
          navigate("/")
        } else {
          alert("Signup failed")
        }
      })
      .catch((err) => {
        console.error("API Error:", err)
        alert("An error occurred during signup. Please try again.")
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 px-4">
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl text-gray-800 text-center animate-fade-in mt-10">
        <div className="absolute inset-0 bg-gray-100 rounded-2xl z-0"></div>

        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-purple-500/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-pink-500/20 rounded-full blur-xl"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">Join our learning community today</p>

          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setUserType("Student")}
              className={`px-5 py-2.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${userType === "Student"
                ? "bg-blue-600 text-white font-medium shadow-lg shadow-blue-500 scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <FaGraduationCap className={userType === "Student" ? "text-white" : "text-gray-500"} />
              Student
            </button>
            <button
              onClick={() => setUserType("Teacher")}
              className={`px-5 py-2.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${userType === "Teacher"
                ? "bg-blue-600 text-white font-medium shadow-lg shadow-blue-500 scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <FaChalkboardTeacher className={userType === "Teacher" ? "text-white" : "text-gray-500"} />
              Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                <FaUser />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-3.5 pl-11 pr-4 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm text-left pl-1 -mt-2 animate-fadeIn">{errors.name}</p>}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                <FaEnvelope />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3.5 pl-11 pr-4 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm text-left pl-1 -mt-2 animate-fadeIn">{errors.email}</p>}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                <FaLock />
              </div>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3.5 pl-11 pr-4 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm text-left pl-1 -mt-2 animate-fadeIn">{errors.password}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-200 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                `Join as ${userType}`
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or continue with</span>
            </div>
          </div>

          <button
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3.5 px-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-300"
            onClick={() => (window.location.href = `${import.meta.env.VITE_APP_BASEURL}/auth/google`)}
          >
            <FaGoogle className="text-red-500" />
            Sign up with Google
          </button>

          <p className="mt-8 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/students/login"
              className="font-semibold text-purple-600 hover:text-purple-800 transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
