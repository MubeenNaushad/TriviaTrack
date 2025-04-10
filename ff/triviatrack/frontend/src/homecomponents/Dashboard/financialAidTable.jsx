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

const FinancialAidTable = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const backendURL = import.meta.env.VITE_APP_BASEURL || "http://localhost:5000";
        const response = await axios.get(`${backendURL}/financial-aid/get-all-aids`, {
          withCredentials: true,
        });
        setApplications(response.data);
      } catch (error) {
        console.error("Failed to fetch financial aid applications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);
  
  const handleDeny = () => {
    // Logic to deny the application
    alert("Application denied.");
  }

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
                  <TableCell>{app.employmentStatus}</TableCell>
                  <TableCell className="font-medium">${app.annualIncome}</TableCell>
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
                    <Button
                      variant="destructive"
                      onClick={handleDeny}
                    >
                      Deny
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

export default FinancialAidTable;
