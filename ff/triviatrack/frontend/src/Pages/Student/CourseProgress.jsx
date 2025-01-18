import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useState } from "react";
import {useParams} from "react-router-dom";

const CourseProgress = () => {
  const {courseId} = useParams();
  const courseTitle = "Introduction to Web Development";
  const completed = false; 
  const lectures = [
    { _id: 1, lectureTitle: "HTML Basics", completed: true },
    { _id: 2, lectureTitle: "CSS Fundamentals", completed: false },
    { _id: 3, lectureTitle: "JavaScript Essentials", completed: false },
  ];
  const [currentLecture, setCurrentLecture] = useState(lectures[0]);

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
  };

  const getCurrentLectureNumber = () => {
    return lectures.findIndex(lec => lec._id === currentLecture._id) + 1;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold ml-5">{courseTitle}</h1>
        <Button variant={completed ? "outline" : "default"}>
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <video
            src="#"
            controls
            className="w-full h-auto md:rounded-lg"
          />
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              Lecture {getCurrentLectureNumber()}: {currentLecture.lectureTitle}
            </h3>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4 mt-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto">
            {lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture._id ? "bg-gray-200 dark:dark:bg-gray-800" : ""
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {lecture.completed ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {lecture.completed && (
                    <Badge variant={"outline"} className="bg-green-200 text-green-600">
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
