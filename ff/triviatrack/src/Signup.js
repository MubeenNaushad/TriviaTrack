import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const navigate = useNavigate();

const handlesubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:3001/signup',{name,email,password})
  .then(res=> navigate('/login'))
  .catch(err=> console.log(err))
  
} 

  return (
    <div className="container">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handlesubmit}>
          <input type="name" placeholder="Enter Username..." required onChange={(e)=> setName(e.target.value)}/>
          <input type="email" placeholder="Enter Email..." required onChange={(e)=> setEmail(e.target.value)} />
          <input type="password" placeholder="Enter Password..." required onChange={(e)=> setPassword(e.target.value)}/>
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
