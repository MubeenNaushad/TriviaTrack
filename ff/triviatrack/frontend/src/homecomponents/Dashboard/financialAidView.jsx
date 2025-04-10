import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FinancialAidView = () => {
  const { appId } = useParams();
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_BASEURL
          }/financial-aid/get-specific-aid/${appId}`,
          {
            withCredentials: true,
          }
        );
        setApplication(response.data);
      } catch (err) {
        console.error("Error fetching application details:", err);
        setError("Error fetching application details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplication();
  }, [appId]);

  const approveApp = async (appId, newStatus) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_BASEURL}/financial-aid/update-aid/${appId}`,
        {
          aidStatus: newStatus,
        },
        {
          withCredentials: true,
        }
      );
      setApplication(response.data);
    } catch (err) {
      console.error("Error updating application details:", err);
      setError("Error updating application details.");
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading application details...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!application) {
    return <div className="p-6">No application found.</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 pt-32">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="text-2xl">
            Financial Aid Application Details
          </CardTitle>
          <CardDescription>
            This is a read‑only view of the submitted financial aid application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 mt-4">
          <div>
            <strong>Name: </strong>
            {application.firstName} {application.lastName}
          </div>
          <div>
            <strong>Email: </strong>
            {application.email}
          </div>
          <div>
            <strong>Phone: </strong>
            {application.phone || "N/A"}
          </div>
          <div>
            <strong>Address: </strong>
            {application.address}
          </div>
          <div>
            <strong>City: </strong>
            {application.city}
          </div>
          <div>
            <strong>State: </strong>
            {application.state}
          </div>
          <div>
            <strong>Zip Code: </strong>
            {application.zipCode}
          </div>
          <div>
            <strong>Date of Birth: </strong>
            {application.dateOfBirth
              ? new Date(application.dateOfBirth).toLocaleDateString()
              : "N/A"}
          </div>

          <div>
            <strong>Employment Status: </strong>
            {application.employmentStatus}
          </div>
          <div>
            <strong>Annual Income: </strong>${application.annualIncome}
          </div>
          <div>
            <strong>Household Size: </strong>
            {application.householdSize}
          </div>
          <div>
            <strong>Current Student: </strong>
            {application.currentStudent}
          </div>
          {application.currentStudent === "yes" && (
            <>
              <div>
                <strong>School Name: </strong>
                {application.schoolName}
              </div>
              <div>
                <strong>Program of Study: </strong>
                {application.programOfStudy}
              </div>
            </>
          )}
          <div className="whitespace-pre-wrap break-words">
            <strong>Aid Reason: </strong>
            {application.aidReason}
          </div>
          <div>
            <strong>Status: </strong>
            {application.status}
          </div>
          <div>
            <strong>Submitted: </strong>
            {new Date(application.submittedAt).toLocaleString()}
          </div>
        </CardContent>
        <div className="text-center">
          <Button className="mr-4" onClick={() => approveApp(application._id, "approved")}>
            Approve
          </Button>
          <Button variant="destructive" className="mb-8">
            Deny
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FinancialAidView;
