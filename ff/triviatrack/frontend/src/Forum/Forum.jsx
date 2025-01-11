// src/components/Forum.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Topics from './Topics.jsx';

const topics = [
  { id: 1, title: 'Introduction to React', categoryId: 'learning' },
  { id: 2, title: 'Advanced JavaScript', categoryId: 'learning' }
];

const Forum = () => {
  const { categoryId } = useParams();

  return (
    <div className="text-center mt-10">
      <div className=''>
      <h2 className="text-2xl font-bold mb-4">Topics in {categoryId}</h2>
      <Topics/>
      </div>
      <ul>
        {topics.filter(topic => topic.categoryId === categoryId).map(topic => (
          <li key={topic.id} className="mb-2">
            <Link to={`/categories/${categoryId}/topics/${topic.id}/${topic.title}`}
              className="text-blue-500 hover:text-blue-700 font-medium text-lg py-2 px-4 rounded-lg shadow bg-white hover:bg-blue-100"
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forum;
