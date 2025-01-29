import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Sidebar from "@/homecomponents/Dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/UserContext";
import axios from "axios";

export function CourseTable() {
  const { user, login } = useUser();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handletable = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASEURL}/course/getcourse`
        );
        setCourses(response.data);
        console.log("tx", user, "log", login);
        console.log("crd", response.data);
      } catch (error) {
        console.error("Failed to get courses:", error);
      }
    };
    handletable();
  }, []);

  const deletecourse = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_BASEURL}/course/delete/${id}`
      );
      setCourses(courses.filter((course) => course._id !== id));
      console.log("course Deleted Successfully");
    } catch (error) {
      console.error("Failed to delete course", error);
    }
  };

  return (
    <div className="flex pt-[2.4rem] mt-10">
      <Sidebar />
      <div className="flex-1 p-10 ">
        <Button onClick={() => navigate(`/add-course`)}>
          Create a new course
        </Button>
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="">Price</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user?.userType === "Admin"
              ? courses.map((course) => (
                  <TableRow key={course._id}>
                    <TableCell>{course.courseTitle}</TableCell>
                    <TableCell>
                      <Badge>
                        {course.isPublished ? "Published" : "Not Published"}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-medium">
                      ${course.coursePrice}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        className="mr-3"
                        variant="outline"
                        onClick={() => navigate(`/list-course/${course._id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="mr-3"
                        variant="destructive"
                        onClick={() => deletecourse(course._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : courses
                  .filter((course) => course?.creator?.email === user.email)
                  .map((course) => (
                    <TableRow key={course._id}>
                      <TableCell>{course.courseTitle}</TableCell>
                      <TableCell>
                        <Badge>
                          {course.isPublished ? "Published" : "Not Published"}
                        </Badge>
                      </TableCell>

                      <TableCell className="font-medium">
                        ${course.coursePrice}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          className="mr-3"
                          variant="outline"
                          onClick={() => navigate(`/list-course/${course._id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="mr-3"
                          variant="destructive"
                          onClick={() => deletecourse(course._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CourseTable;
