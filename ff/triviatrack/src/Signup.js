import React from 'react';
import { Link } from 'react-router-dom';


const Signup = () => {
  return (
    <div className="container">
      <div className="form-container">
        <h2>Register</h2>
        <form>
          <input type="text" placeholder="Enter Username..." required />
          <input type="email" placeholder="Enter Email..." required />
          <input type="password" placeholder="Enter Password..." required />
          <button type="submit">Register</button>
          <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-google"></i>
          <i className="fab fa-apple"></i>
        </div>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
