// src/components/Forum.jsx
import React from 'react';
import Topics from './Topics.jsx'; // This imports the Topics component

const Forum = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Forum</h1>
      <Topics />  // Renders the Topics component which handles topic display and addition
    </div>
  );
};

export default Forum;
