import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Import as a CSS Module
import axios from 'axios';
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handlesubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(res => {
        if (res.data.Login) {
          navigate('/');
        } else {
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-form-container']}>
        <h2 className={styles['login-title']}>Welcome To TriviaTrack</h2>

        <form onSubmit={handlesubmit}>
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
          <button type="submit" className={styles['login-button']}>Login</button>
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
  );
};

export default Login;
