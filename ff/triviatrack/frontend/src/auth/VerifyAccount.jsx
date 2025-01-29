import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyAccount = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("token is", token);
    axios.get(`http://localhost:3001/students/verify-the-account/${token}`)
      .then((response) => {
        alert('Email verified successfully!', response);
        navigate('/students/login');
      })
  }, []);

  return (
    <div className='text-2xl text-center mt-24'>
      Verifying your email...
    </div>
  );
};

export default VerifyAccount;
