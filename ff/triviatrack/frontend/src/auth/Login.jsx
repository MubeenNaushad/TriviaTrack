"use client"

import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { useUser } from "../context/UserContext"
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa"
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const { login } = useUser()
  const navigate = useNavigate()

  axios.defaults.withCredentials = true

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    axios
      .post(`${import.meta.env.VITE_APP_BASEURL}/students/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log("API Response:", res.data)
        if (res.data.Login && res.data.isVerified) {
          const user = res.data.user || {}
          login({
            name: user.name || "Unknown",
            userType: user.userType || "Unknown",
            profilePhoto: user.photoUrl || "https://via.placeholder.com/40",
          })
          navigate("/")
          toast.success("Login Successful")

        } else if (res.data.Login && !res.data.isVerified) {
          setError("Please verify your email before logging in.")
        } else {
          setError("Invalid email or password. Please try again.")
        }
      })
      .catch((err) => {
        console.error("API Error:", err)
        setError("An error occurred during login. Please try again.")
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
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-8">Sign in to continue your learning journey</p>

          {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 animate-fadeIn">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <div className="flex justify-end">
              <Link
                to="/students/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-blue-400 focus:outline-none focus:ring-4 focus:ring-purple-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
                  Signing in...
                </span>
              ) : (
                "Sign In"
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
            Sign in with Google
          </button>

          <p className="mt-8 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/students/signup"
              className="font-semibold text-purple-600 hover:text-purple-800 transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
