import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";

const LectureTab = () => {
  const [lectureTitle, setlectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const params = useParams();

  const { courseId, lectureId } = params;
  const navigate = useNavigate();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_BASEURL}/media/upload-video`,
          formData,
          {
            onUploadProgress: ({ loaded, total }) => {
              setUploadProgress(Math.round((loaded * 100) / total));
            },
          }
        );
        if (res.data.success) {
          console.log("id", courseId, lectureId);
          console.log(res);
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const isFreeHandler = () => {
    if (isFree == false) setIsFree(true);
    if (isFree == true) setIsFree(false);
  };

  const updateLecture = async () => {
    try {
      await axios.patch(
        `${
          import.meta.env.VITE_APP_BASEURL
        }/course/${courseId}/lecture/${lectureId}`,
        {
          lectureTitle,
          videoInfo: uploadVideoInfo,
          isPreviewFree: isFree,
          courseId,
          lectureId,
        }
      );
      console.log("Lecture edited successfully");
      navigate(`/list-course/${courseId}/lecture`);
    } catch (error) {
      console.log(error);
    }
  };

  const removeLecture = async () => {
    if (!lectureId) {
      console.error("Lecture ID is missing.");
      return;
    }

    try {
      const res = await axios.delete(
        `${
          import.meta.env.VITE_APP_BASEURL
        }/course/${courseId}/lecture/${lectureId}`
      );

      console.log("Lecture removed successfully:", res.data);
      navigate(`/list-course/${courseId}/lecture`);
    } catch (error) {
      console.log("Error removing lecture:", error);
    }
  };

  return (
    <Card className="mt-8 w-full">
      <CardHeader className="flex justify-between gap-2">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
            aspernatur.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" onClick={removeLecture}>
            Remove Lecture
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setlectureTitle(e.target.value)}
            type="text"
            placeholder="Eg. Intro"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            placeholder="Eg. Intro"
            className="w-fit hover:cursor-pointer"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            id="airplane-mode"
            checked={isFree}
            onChecked={isFreeHandler}
          />
          <Label htmlFor="airplane-mode">Is this lecture free?</Label>
        </div>

        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>Uploading: {uploadProgress}%</p>
          </div>
        )}
        <div className="mt-4">
          <Button onClick={updateLecture}>Update Lecture</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
