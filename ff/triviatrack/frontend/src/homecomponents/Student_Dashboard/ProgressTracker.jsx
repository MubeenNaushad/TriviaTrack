import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {Progress} from "@/components/ui/progress";

const ProgressTracker = () => {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [totalLectures, setTotalLectures] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_BASEURL}/students/get-my-learning`)
      .then((response) => {
        setCourses(response.data.enrolledCourses);
        response.data.enrolledCourses.forEach(course => {
          fetchCourseProgress(course._id);
        });
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch courses", error);
        setIsLoading(false);
      });
  }, []);

  const fetchCourseProgress = (courseId) => {
    axios.get(`${import.meta.env.VITE_APP_BASEURL}/progress/check/${courseId}`)
      .then((response) => {
        const courseProgress = response.data.data.progress || [];
        console.log(response.data, "res.data");
        const completedLectures = response.data.data.progress.filter(p => p.viewed).length;
        setProgress(prev => ({ ...prev, [courseId]: completedLectures }));
        console.log(progress, "progress");
        setTotalLectures(prev => ({ ...prev, [courseId]: courseProgress.length }));

      })
      .catch(error => {
        console.error("Failed to fetch progress for course", courseId, error);
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-20">
      <h1 className="text-xl font-semibold mb-4">Course Progress</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {courses.length === 0 ? (
            <p>No courses enrolled.</p>
          ) : (
            courses.map(course => (
              <div key={course._id} className="mb-4 p-4 shadow rounded-lg mt-4 gap-y-8">
                <h2 className="font-bold text-lg mt-2">{course?.courseTitle}</h2>
                <p className="mt-2">{progress[course._id] || 0} out of {course?.totalLectures || course?.lectures.length} lectures completed</p>
                <Progress className="mt-2" value={(progress[course._id] || 0) / (totalLectures[course._id] || 1) * 100} />
                <Link to={`/courses/course-details/${course._id}`} className="text-blue-500 hover:underline mt-2">View Course</Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
