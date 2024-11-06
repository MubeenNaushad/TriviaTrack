import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="container">
      <div className="form-container">
        <h2>Welcome To TriviaTrack</h2>
        
        <form>
          <input type="email" placeholder="Enter Email..." required />
          <input type="password" placeholder="Enter Password..." required />
          <button type="submit">Login</button>
        </form>
        <div className="forgot-password">
          <a href="#">Forgot Password?</a>
        </div>
        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-google"></i>
          <i className="fab fa-apple"></i>
        </div>
        <p>
          Don't have an account? <Link to="/signup" style={{ color: '#535366', textDecoration: 'underline' }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
