import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MdQuiz } from "react-icons/md";

const CourseProgress = () => {
  axios.defaults.withCredentials = true;

  const params = useParams();
  const { courseId } = params;
  const navigate = useNavigate();

  const [courseDetails, setCourseDetails] = useState({
    categories: [],
    category: "",
    courseLevel: "",
    coursePrice: 0,
    courseThumbnail: "",
    courseTitle: "",
    createdAt: "",
    description: "",
    enrolledStudents: [],
    isPublished: false,
    lectures: [],
    subTitle: "",
    _id: "",
  });
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState([]);
  const [currentLecture, setCurrentLecture] = useState([]);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASEURL}/progress/check/${courseId}`
        );
        const data = response.data.data;

        setCourseDetails(data.courseDetails);
        setProgress(data.progress);
        setCompleted(data.completed);
        if (data.courseDetails.lectures.length > 0) {
          setCurrentLecture(data.courseDetails.lectures[0]);
        }
        console.log("hereee", data);
      } catch (error) {
        console.error("Failed to fetch course progress", error);
      }
    };

    fetchCourseProgress();
  }, []);

  const updateLectureProgress = async (lectureId) => {
    try {
      const updatedProg = await axios.post(
        `${
          import.meta.env.VITE_APP_BASEURL
        }/progress/${courseId}/lecture/${lectureId}/view`
      );
      if (lectureId === currentLecture._id) {
        setProgress(updatedProg.data.CheckProgress);
      }
      console.log("newww", updatedProg.data.CheckProgress);
    } catch (error) {
      console.error("Failed to update lecture progress", error);
    }
  };

  const completeLectureProgress = async (lectureId) => {
    try {
      const updatedProg = await axios.post(
        `${
          import.meta.env.VITE_APP_BASEURL
        }/progress/${courseId}/lecture/${lectureId}/complete`
      );
      if (lectureId === currentLecture._id) {
        setProgress(updatedProg.data.CheckProgress);
      }
      console.log("newww", updatedProg.data.CheckProgress);
    } catch (error) {
      console.error("Failed to update lecture progress", error);
    }
  };

  const getLectureNumber = () => {
    return (
      courseDetails.lectures.findIndex(
        (lec) => lec._id === currentLecture?._id
      ) + 1
    );
  };

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const markAsCompleted = async () => {
    try {
      const CompleteCourse = await axios.post(
        `${import.meta.env.VITE_APP_BASEURL}/progress/${courseId}/complete`
      );
      setCompleted(true);
      setProgress(progress.map((prog) => ({ ...prog, viewed: true })));
      console.log("com", CompleteCourse.data);
    } catch (error) {
      console.error("Failed to mark course as completed", error);
    }
  };

  const markAsInCompleted = async () => {
    try {
      const InCompleteCourse = await axios.post(
        `${import.meta.env.VITE_APP_BASEURL}/progress/${courseId}/incomplete`
      );
      setCompleted(false);
      setProgress(progress.map((prog) => ({ ...prog, viewed: false })));
      console.log("Incom", InCompleteCourse.data);
    } catch (error) {
      console.error("Failed to mark course as incomplete", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-24">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold ml-5">{courseDetails.courseTitle}</h1>
        <Button
          onClick={completed ? markAsInCompleted : markAsCompleted}
          variant={completed ? "outline" : "default"}
        >
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
            src={currentLecture.videoUrl}
            controls
            className="w-full h-auto md:rounded-lg"
            //            onPlay={() => updateLectureProgress(currentLecture._id)}
            onEnded={() => completeLectureProgress(currentLecture._id)}
          />
          <div className="mt-2">
            <h3 className="font-medium text-lg">
              Lecture {getLectureNumber()}: {currentLecture.lectureTitle}
            </h3>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4 mt-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture._id
                    ? "bg-gray-200 dark:dark:bg-gray-800"
                    : ""
                }`}
                onClick={() => setCurrentLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
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

                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}

            <Card
              className="mb-3 hover:cursor-pointer transition transform"
              onClick={() => navigate(`/quiz/${courseId}`)}
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <MdQuiz size={24} className="text-gray-500 mr-2" />
                  <div>
                    <CardTitle className="text-lg font-medium">Quiz</CardTitle>
                  </div>
                </div>

                <Badge
                  variant={"outline"}
                  className="bg-green-200 text-green-600"
                >
                  Passed
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
