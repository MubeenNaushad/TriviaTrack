import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Course from "../../Pages/admin/course/Course";
import {Progress} from "@/components/ui/progress";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentProfile = () => {

  const [profile, setProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const enrolledIn = [1, 2];

  const [enrolledCourses, setenrolledCourses] = useState([]);
  const [maxPoints, setmaxPoints] = useState(100);
  const [rankPic, setrankPic] = useState("");
  const [points, setPoints] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const {studentId} = useParams();

  useEffect(() => {
    if (studentId) {
      fetchStudentProfile(studentId);
    }
  }, [studentId]);

  const fetchStudentProfile = (studentId) => {
    axios.get(`${import.meta.env.VITE_APP_BASEURL}/students/student-details/${studentId}`, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data.success) {
        setProfile(response.data.user);
        setIsLoading(false);
      } else {
        setError("Profile not found");
        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.error("Error fetching profile:", err);
      setError("Error fetching data");
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const getRankLogo = (points) => {
      if (points < 100) {
        setmaxPoints(100);
        setrankPic("https://cdn3d.iconscout.com/3d/premium/thumb/bronze-rank-3d-icon-download-in-png-blend-fbx-gltf-file-formats--medal-position-identification-badge-game-equipment-star-adventure-pack-sports-games-icons-8955734.png?f=webp");
      } else if (points >= 100 && points < 200) {
        setmaxPoints(200);
        setrankPic("https://cdn3d.iconscout.com/3d/premium/thumb/silver-rank-3d-icon-download-in-png-blend-fbx-gltf-file-formats--position-medal-identification-badge-game-equipment-star-adventure-pack-sports-games-icons-8955733.png");
      } else if (points >= 200 && points < 300) {
        setmaxPoints(300);
        setrankPic("https://cdn3d.iconscout.com/3d/premium/thumb/gold-rank-3d-icon-download-in-png-blend-fbx-gltf-file-formats--bronze-medal-position-identification-badge-adventure-game-pack-sports-games-icons-8955735.png?f=webp");
      } else if (points >= 300) {
        setmaxPoints(400);
        setrankPic("https://cdn3d.iconscout.com/3d/premium/thumb/rank-diamond-3d-icon-download-in-png-blend-fbx-gltf-file-formats--bronze-medal-award-winner-pack-sign-symbols-icons-9325599.png?f=webp");
      }
    };
    setPercentage((profile.points / 100) * 10);
    console.log(percentage, profile.points, maxPoints);
    getRankLogo(profile.points);
  }, [profile.points]);

  
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/students/get-my-learning`)
      .then((response) => {
        setenrolledCourses(response.data.enrolledCourses);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Failed to fetch courses", error);
        setIsLoading(false);
      });
  }, []);


  return (
    <div className="max-w-4xl mx-auto my-24 px-4">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5 justify-between">
        <div className="flex flex-col md:flex-row items-center">
          <Avatar className="h-24 w-24 md:h-32 md:wd-32 mb-4">
            <AvatarImage
              src={profile?.photoUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        
        <div className="ml-4">
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {profile?.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {profile?.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {profile?.userType}
              </span>
            </h1>
          </div>

          
          
          </div>

          </div>
          <div className="items-center mr-2 mb-8">
          <img src={rankPic} alt="Rank Logo" className="w-24 h-25"/>
          <p>{profile.points}/{maxPoints} Points</p>
          <Progress value={percentage} />
        </div>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses they're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {enrolledIn.length === 0 ? (
            <h1>You haven't enrolled in any course.</h1>
          ) : (
            enrolledCourses.map((course, index) => (
              <Course key={index} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
