// src/components/TopicDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './CommentSection';

const TopicDetails = () => {
  const { topicId, topicTitle } = useParams();
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Discussion for Topic: {topicTitle}</h2>
      <CommentSection />
    </div>
  );
};

export default TopicDetails;
