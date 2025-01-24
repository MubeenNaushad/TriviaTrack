import React from "react";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import BuyCourse from "@/homecomponents/Buttons/BuyCourse.jsx";
import axios from "axios";
import { useState, useEffect } from "react";

const CourseDetail = () => {
  const Navigate = useNavigate();

  const { courseId } = useParams();
  const [course, setCourses] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchased, setPurchased] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_APP_BASEURL
        }/purchase/course/${courseId}/detail-with-status`
      )
      .then((response) => {
        console.log(response);
        setCourses(response.data.course);
        setPurchased(response.data.purchased);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch courses", error);
        setError(error);
        setIsLoading(false);
      });
  }, [courseId]);

  const handleContinueCourse = () => {
    Navigate(`/progress/${courseId}`);
  };

  const handleOpenForum = () => {
    Navigate("/forum");
  };

  return (
    <div className="space-y-5 mt-10">
      {!isLoading && !course && <p>No courses found</p>}
      <div key={courseId}>
        <div className="bg-[#2D2F31] text-white">
          <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
            <h1 className="font-bold text-2xl md:text-3xl">
              {course?.courseTitle}
            </h1>
            <p className="text-base md:text-lg">{course?.category}</p>
            <p>
              Created By{" "}
              <span className="text-[#C0C4FC] underline italic">
                {course?.creator?.name}
              </span>
            </p>
            <div className="flex items-center gap-2 text-sm">
              <BadgeInfo size={16} />
              <p>Last updated {course?.createdAt}</p>
            </div>
            <p>Students enrolled: {course?.enrolledStudents.length}</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
          <div className="w-full lg:w-1/2 space-y-5">
            <h1 className="font-bold text-xl md:text-2xl">Description</h1>
            <p
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: course?.description }}
            />
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>
                  {course?.lectures.length} lectures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {course?.lectures?.map((lecture, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-sm"
                    onClick={() =>
                      Navigate(`/course/${courseId}/lecture/${lecture._id}`)
                    }
                  >
                    <span>
                      <PlayCircle size={14} />{" "}
                    </span>
                    <p>{lecture?.lectureTitle}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="w-full lg:w-1/3">
            <Card>
              <CardContent className="p-4 flex flex-col">
                <div className="w-full aspect-video mb-4">
                  {course?.lectures[0]?.videoUrl ? (
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      url={course?.lectures[0]?.videoUrl} // Ensure there is a video URL
                      controls={true}
                    />
                  ) : (
                    <p>No video</p>
                  )}
                </div>
                <h1>{course?.lectures[0]?.title}</h1>{" "}
                {/* Display the title of the first lecture */}
                <Separator className="my-2" />
                <h1 className="text-lg md:text-xl font-semibold">
                  Course Price: {course?.coursePrice}
                </h1>
              </CardContent>
              <CardFooter className="flex justify-center p-4">
                {purchased ? (
                  <>
                    <Button
                      onClick={handleContinueCourse}
                      className="w-full mr-4"
                    >
                      Continue Course
                    </Button>
                    <Button onClick={handleOpenForum} className="w-full">
                      Open Forum
                    </Button>
                  </>
                ) : (
                  <BuyCourse courseId={courseId} />
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
