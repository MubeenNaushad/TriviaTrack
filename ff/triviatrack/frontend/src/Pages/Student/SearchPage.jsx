import React, { useState, useEffect } from "react";
import SearchResult from "./SearchResult";
import Filter from "./Filter";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [sortByPrice, setSortByPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);

      let url = `${import.meta.env.VITE_APP_BASEURL}/course/search?query=${encodeURIComponent(query)}`;

      if (sortByPrice !== "") {
        url += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
      }

      // ✅ Use categories[]=... format
      if (selectedCategories.length > 0) {
        selectedCategories.forEach((cat) => {
          url += `&categories[]=${encodeURIComponent(cat)}`;
        });
      }

      console.log("Final URL:", url); // Debug

      try {
        const response = await axios.get(url);
        setCourses(response.data.courses);
        setError("");
      } catch (err) {
        setError("Failed to fetch courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [query, sortByPrice, selectedCategories]);

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  const isEmpty = !isLoading && courses?.length === 0;

  return (
    <div className="max-w-8xl mx-auto p-6 md:p-8 md:px-56 mt-5">
      <div className="my-6">
        <h1 className="font-bold text-xl md:text-2xl">
          Results for "{query}"
        </h1>
        <p>
          Showing results for{" "}
          <span className="font-bold text-blue-800 italic">{query}</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4">
          <Filter handleFilterChange={handleFilterChange} />
        </div>

        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            courses.map((course) => (
              <SearchResult key={course._id} course={course} />
            ))
          )}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseSkeleton = () => {
  return (
    <div className="p-4 border border-gray-300 rounded mb-4 animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

const CourseNotFound = () => {
  return <p className="text-gray-600">No courses found.</p>;
};
