import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Course from "../admin/course/Course";
import { Input } from "@/components/ui/input";
import {Progress} from "@/components/ui/progress";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const [profile, setProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const enrolledIn = [1, 2];

  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState();
  const [enrolledCourses, setenrolledCourses] = useState([]);
  const [maxPoints, setmaxPoints] = useState(100);
  const [rankPic, setrankPic] = useState("");
  const [points, setPoints] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_BASEURL}/students/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          setProfile(response.data.user);
          setPoints(response.data.user.points);
        } else {
          setError("Error");
        }
      })
      .catch(() => {
        setError("Error");
      });
  }, []);

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

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name cannot be empty.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("photoUrl", profilePhoto);

    axios
      .patch(
        `${import.meta.env.VITE_APP_BASEURL}/students/update/${profile._id}`,
        formData,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setIsLoading(false);
        if (response.data.success) {

          setProfile(response.data.user);
          console.log("Profile updated successfully");
        } else {
          setError("Failed to update profile");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError("An error occurred during profile update");
        console.error("Error updating profile:", error);
      });
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleFileChange = (event) => {
    setProfilePhoto(event.target.files[0]);
  };


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

          
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                    className="col-span-3"
                    value={name}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleUpdateProfile} disabled={isLoading}>
                  {isLoading ? (
                    <div className="border-4 border-blue-500 border-dotted rounded-full w-8 h-8 animate-spin"></div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
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

export default Profile;
