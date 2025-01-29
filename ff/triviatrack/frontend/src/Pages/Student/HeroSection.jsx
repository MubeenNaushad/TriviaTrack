import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      console.log("hererer", searchQuery);
      navigate(`/course/search?query=${encodeURIComponent(searchQuery)}`);
    }
    setSearchQuery("");
  };
  return (
    <div className="mt-20 relative bg-gray-800 py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find the Best courses for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn and Upskill with Gamified Courses
        </p>
        <form
          onSubmit={handleSearch}
          className="flex item-center border-none focus:outline-none bg-white rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search For Gamified Courses"
            className="flex-grow border-none focus:outline-none px-6 py-3 text-gray-900 placeholder-gray-400 "
          ></input>
          <button
            type="submit"
            className="border-none bg-blue-600 text-white px-6 py-3 rounded-r-full hover:bg-blue-700"
          >
            Search
          </button>
        </form>
        <button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white text-blue-600 rounded-full hover:bg-slate-200 py-3 px-5"
        >
          Explore Courses
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
