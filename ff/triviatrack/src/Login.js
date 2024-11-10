import { Link,useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import React, { useState } from "react";
import Dashboard from './DashboardPage.js';



const Login = () => {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

const handlesubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:3001/login',{email,password})
  .then(res=> {
   if(res.data.Login){
   navigate('/Dashboard');  
}else{
  navigate('/')
}
}

)
.catch(err=> console.log(err))
  
} 

  return (
    <div className="container">
      <div className="form-container">
        <h2>Welcome To TriviaTrack</h2>
        
        <form onSubmit={handlesubmit}>
          <input type="email" placeholder="Enter Email..." required onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" placeholder="Enter Password..." required onChange={(e)=> setPassword(e.target.value)}/>
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
