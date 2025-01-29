
import React from 'react';
import Topics from './Topics.jsx'; 

const Forum = () => {
  return (
    <div className="flex justify-center items-center flex-col mt-48">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Forum</h1>
      <Topics />  
    </div>
  );
};

export default Forum;
