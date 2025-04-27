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

const CourseAidTable = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BASEURL
          }/financial-aid/get-course-aid-apps`,
          {
            withCredentials: true,
          }
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Failed to fetch financial aid applications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="flex pt-[2.4rem] mt-10">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-2xl font-bold mb-4">Financial Aid Applications</h1>
        {isLoading ? (
          <p>Loading applications...</p>
        ) : (
          <Table className="mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course Name</TableHead>
                <TableHead>Employment Status</TableHead>
                <TableHead>Annual Income</TableHead>
                {/* <TableHead>Aid Reason</TableHead> */}
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app._id}>
                  <TableCell>
                    {app.firstName} {app.lastName}
                  </TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app?.courseId?.courseTitle}</TableCell>
                  <TableCell>{app.employmentStatus}</TableCell>
                  <TableCell className="font-medium">
                    ${app.annualIncome}
                  </TableCell>
                  {/* <TableCell>{app.aidReason}</TableCell> */}
                  <TableCell>
                    {new Date(app.submittedAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      onClick={() => navigate(`/financial-aid-view/${app._id}`)}
                      className="mr-2"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default CourseAidTable;
