import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from "react";
import styles from './Signup.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Student'); // Default to "Student"
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/signup', { name, email, password, userType })
      .then(res => navigate('/login'))
      .catch(err => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 p-4">
      <div className={styles['signup-container']}>
        <div className={styles['signup-form-container']}>
          <h2 className={styles['signup-title']}>Register</h2>

          
          <form onSubmit={handleSubmit}>

            <select 
              value={userType} 
              onChange={(e) => setUserType(e.target.value)} 
              className={styles['signup-input']} 
              required
            >
              <option value="Student">Select</option>
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
            </select>
            
            <input
              type="text"
              placeholder="Enter Username..."
              required
              onChange={(e) => setName(e.target.value)}
              className={styles['signup-input']}
            />
            <input
              type="email"
              placeholder="Enter Email..."
              required
              onChange={(e) => setEmail(e.target.value)}
              className={styles['signup-input']}
            />
            <input
              type="password"
              placeholder="Enter Password..."
              required
              onChange={(e) => setPassword(e.target.value)}
              className={styles['signup-input']}
            />

            {/* Dropdown for User Type */}
            
            <button type="submit" className={styles['signup-button']}>Register</button>
            
            <div className={styles['signup-social-icons']}>
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-google"></i>
              <i className="fab fa-apple"></i>
            </div>
          </form>
          
          <p>
            Already have an account? <Link to="/login" className={styles['signup-login-link']}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
