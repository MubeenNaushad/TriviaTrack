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

export function EnrolledStudents() {
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

  return (
    <div className="flex pt-[2.4rem] mt-10">
      <Sidebar />
      <div className="flex-1 p-10 ">
        
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Enrolled Course</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.filter(course => course?.creator?.email === user?.email).map(course => (
              course.enrolledStudents.map(student => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{course.courseTitle}</TableCell>
                  <TableCell>
                    <Button onClick={() => navigate(`/students/student-details/${student._id}`)}>View Profile</Button>
                  </TableCell>
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default EnrolledStudents;
