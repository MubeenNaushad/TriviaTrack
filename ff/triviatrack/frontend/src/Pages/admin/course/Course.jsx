import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Course({ course }) {
  if (!course) {
    return <div>No course data available.</div>;
  }
  return (
    <div key={course._id}>
      <Link to={`course-details/${course._id}`}>
        <Card className="overflow-hidden rounded-lg big-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
          <div className="relative ">
            <img
              src={
                course?.courseThumbnail
                  ? course.courseThumbnail
                  : "https://fireship.io/courses/react/img/featured.png"
              }
              className="w-full h-36 object-cover rounded-t-lg"
            ></img>
          </div>
          <CardContent className="px-5 py-4 space-y-3">
            <Link to={`course-details/${course._id}`} key={course._id}>
              <h1 className="hover:underline font-bold text-lg truncate cursor-pointer">
                {course?.courseTitle
                  ? course?.courseTitle
                  : "ReactJs Complete Course"}
              </h1>
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      course?.creator?.photoUrl
                        ? course?.creator?.photoUrl
                        : "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="font-medium text-sm">
                  {course?.creator?.name
                    ? course?.creator?.name
                    : "TriviaTrack"}
                </h1>
              </div>
              <Badge
                className={
                  "bg-blue-600 text-white px-2 py-1 text-xs rounded-full cursor-pointer"
                }
              >
                {course?.creator?.courseLevel ? course?.courseLevel : "Advance"}
              </Badge>
            </div>
            <div className="text-lg font-medium">
              {course?.coursePrice ? course?.coursePrice : "1500 PKR"}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export default Course;
