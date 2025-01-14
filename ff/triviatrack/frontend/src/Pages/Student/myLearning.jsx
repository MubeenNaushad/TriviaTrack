import React, { useState, useEffect } from "react";
import Course from "./Course.jsx"
import axios from "axios";

const MyLearning = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [myLearningCourses, setMyLearningCourses] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/course/getcourse`)
    .then((response) => {
      setMyLearningCourses(response.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log("Failed to fetch courses", error);
      setIsLoading(false);
    })
  }, []);

  return (
    <div>
      <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
        <h1 className="font-bold text-2xl">My Learning</h1>

        <div className="my-5">
          {isLoading ? (
            <MyLearningSkeleton />
          ) : myLearningCourses.length === 0 ? (
            <p>You are not enrolled in any course.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {myLearningCourses.map((course, index) => (
                <Course key={index} course={course}/>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
