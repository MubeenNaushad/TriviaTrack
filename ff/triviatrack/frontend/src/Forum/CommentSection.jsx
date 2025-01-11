import React, { useState } from 'react';

const CommentSection = ({ topicId }) => {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (event, text) => {
    event.preventDefault();
    const newComment = {
      id: comments.length + 1,
      text,
      date: new Date().toISOString().slice(0, 10),
      replies: []
    };
    setComments([...comments, newComment]);
  };

  return (
    <div>
      <form onSubmit={(e) => handleCommentSubmit(e, e.target.elements.comment.value)}>
        <textarea name="comment" className="w-full p-3 border border-gray-300 rounded shadow-sm" placeholder="Write something..." rows="4" required></textarea>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Post Comment</button>
      </form>
      {comments.map(comment => (
        <div key={comment.id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-800">{comment.text}</p>
          <div className="text-right text-xs text-gray-500">{comment.date}</div>
          {/* Implement recursive comment display if replies are added */}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
