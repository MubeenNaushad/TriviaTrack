import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CourseTab = () => {
  const { id } = useParams();

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASEURL}/course/getcourse/${id}`
        );
        const courses = response.data;

        console.log("Data Fetched Successfully", courses);
        setInput({
          courseTitle: courses.courseTitle,
          subTitle: courses.subTitle,
          description: courses.description,
          category: courses.category,
          courseLevel: courses.courseLevel,
          coursePrice: courses.coursePrice,
          courseThumbnail: courses.courseThumbnail,
        });
      } catch (error) {
        console.error("Failed to fetch course", error);
      }
    };
    fetchdata();
  }, [id]);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const changeEventhandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const getcategory = (value) => {
    setInput({ ...input, category: value });
  };

  const getcourselevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const updatecourse = async (id) => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
  
    if (input.courseThumbnail instanceof File) {
      formData.append("courseThumbnail", input.courseThumbnail);
    }
  
    try {
      await axios.put(`${import.meta.env.VITE_APP_BASEURL}/course/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Course Updated Successfully");
      navigate("/list-course");
    } catch (error) {
      console.error("Failed to update course", error);
    }
  };

  const publishStatusHandler = async (action) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_APP_BASEURL}/course/${id}`,
        {
          
          isPublished:action,
        }
      );
    } catch (error) {
      console.error("Failed to update Publish status", error);
    }
  };
  

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make Edits to your Courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="flex gap-2 ">
          <Button
            variant="outline"
           
          >
            {input.isPublished ? "Publish" : "UnPublish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventhandler}
              placeholder="Enter Your Title"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventhandler}
              placeholder="Enter Your Subtitle"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select onValueChange={getcategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select onValueChange={getcourselevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Course Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (PKR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventhandler}
                placeholder="Enter price"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="w-64 my-2"
                alt="Course Preview"
              />
            )}
          </div>
          <Button variant="outline" onClick={() => navigate("/list-course")}>
            Cancel
          </Button>
          <Button className="ml-2" onClick={() => updatecourse(id)} variant="">
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
