import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';
import React, { useState } from "react";
import '@fortawesome/fontawesome-free';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState("Student");
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
  };

  const toggleUserType = () => {
    setUserType(prevType => (prevType === "Student" ? "Teacher" : "Student"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 p-4 mt-10">
      <div className={styles['login-container']}>
        <div className={styles['login-form-container']}>
          
          <h2 className={styles['login-title']}>Welcome To TriviaTrack</h2>

          
          <div className="flex justify-center mb-6">
            <button 
              onClick={toggleUserType}
              className={`${styles['toggle-button']} ${userType === "Student" ? styles['active'] : ''}`}
            >
              Student
            </button>
            <button 
              onClick={toggleUserType}
              className={`${styles['toggle-button']} ${userType === "Teacher" ? styles['active'] : ''}`}
            >
              Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Email..."
              required
              onChange={(e) => setEmail(e.target.value)}
              className={styles['login-input']}
            />
            <input
              type="password"
              placeholder="Enter Password..."
              required
              onChange={(e) => setPassword(e.target.value)}
              className={styles['login-input']}
            />
            <button type="submit" className={styles['login-button']}>Login as {userType}</button>
          </form>

          <div className={styles['login-forgot-password']}>
            <a href="#">Forgot Password?</a>
          </div>

          <div className="flex justify-center mt-4">
              <button
                className="flex items-center justify-center bg-inherit border border-white text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 mb-4"
                type="button"
              >
                <i className="fab fa-google mr-2"></i> Continue with Google
              </button>
            </div>

          <p>
            Don't have an account? <Link to="/students/signup" className={styles['login-register-link']}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
