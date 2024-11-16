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
    axios.post('http://localhost:3001/login', { email, password, userType })
      .then(res => {
        if (res.data.Login) {
          navigate('/');
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  // Toggle user type between Student and Teacher
  const toggleUserType = () => {
    setUserType(prevType => (prevType === "Student" ? "Teacher" : "Student"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 p-4 mt-10">
      <div className={styles['login-container']}>
        <div className={styles['login-form-container']}>
          
          <h2 className={styles['login-title']}>Welcome To TriviaTrack</h2>

          {/* Toggle Button */}
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

          <div className={styles['login-social-icons']}>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-google"></i>
            <i className="fab fa-apple"></i>
          </div>

          <p>
            Don't have an account? <Link to="/signup" className={styles['login-register-link']}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
