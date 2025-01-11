// src/components/Categories.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 'learning', name: 'Learning' },
  { id: 'fun', name: 'Fun' },
  { id: 'extra', name: 'Extra' }
];

const Categories = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Select a Category</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id} className="mb-4">
            <Link to={`/categories/${category.id}`}
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg py-2 px-4 rounded-lg shadow bg-white hover:bg-blue-100"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
