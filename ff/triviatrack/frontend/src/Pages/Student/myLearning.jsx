import React, { useState, useEffect } from "react";
import Course from "../admin/course/Course.jsx";
import axios from "axios";

const MyLearning = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [myLearningCourses, setMyLearningCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [totalLectures, setTotalLectures] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/students/get-my-learning`)
      .then((response) => {
        console.log(response);
        setMyLearningCourses(response.data.enrolledCourses);
        response.data.enrolledCourses.forEach((course) => {
          fetchProgress(course._id);
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Failed to fetch courses", error);
        setIsLoading(false);
      });
  }, []);

  const fetchProgress = (courseId) => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/progress/check/${courseId}`)
      .then((response) => {
        const progressData = response.data.data.progress || [];
        console.log("prog", progressData);
        setProgress((prevProgress) => ({
          ...prevProgress,
          [courseId]: progressData.filter((p) => p.viewed).length, // Only count viewed lectures
        }));
        setTotalLectures((prevProgress) => ({
          ...prevProgress,
          [courseId]: progressData.length, // Only count viewed lectures
        }));
        console.log("prg", progress);
      })
      .catch((error) => {
        console.error("Failed to fetch progress for course", courseId, error);
      });
  };

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
            <div className="flex flex-row flex-wrap gap-4">
              {myLearningCourses.map((course, index) => (
                <div key={index}>
                  <Course course={course} />
                  
                </div>
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
