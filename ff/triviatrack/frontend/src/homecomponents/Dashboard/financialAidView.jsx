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
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  GraduationCap,
  FileText,
  Calendar,
  Users,
  Briefcase,
  Home,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  ChevronLeft
} from "lucide-react";

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
        console.log("datt", response.data);
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
      
      // Update the local state with the new data
      setApplication(prev => ({
        ...prev,
        aidStatus: newStatus
      }));
      
      toast({
        title: "Success",
        description: "Application has been approved successfully.",
        variant: "default",
      });
    } catch (err) {
      console.error("Error updating application details:", err);
      setError("Error updating application details.");
      toast({
        title: "Error",
        description: "Failed to approve application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const denyApp = async (appId, newStatus) => {
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
      
      // Update the local state with the new data
      setApplication(prev => ({
        ...prev,
        aidStatus: newStatus
      }));
      
      toast({
        title: "Application Denied",
        description: "Application has been denied successfully.",
        variant: "default",
      });
    } catch (err) {
      console.error("Error updating application details:", err);
      setError("Error updating application details.");
      toast({
        title: "Error",
        description: "Failed to deny application. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 animate-pulse">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <p className="text-lg text-gray-600">Loading application details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <FileText className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-lg text-gray-600">No application found.</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1 text-sm font-medium">
            <CheckCircle className="w-4 h-4 mr-1" />
            Approved
          </Badge>
        );
      case "denied":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200 px-3 py-1 text-sm font-medium">
            <XCircle className="w-4 h-4 mr-1" />
            Denied
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 px-3 py-1 text-sm font-medium">
            <Clock className="w-4 h-4 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      {/* Header Section */}
      <div className="text-center mb-12 pt-20">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
          <Eye className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Application Review
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Detailed view of the financial aid application with all submitted information
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8" />
                <div>
                  <CardTitle className="text-3xl font-bold">Application Details</CardTitle>
                  <CardDescription className="text-blue-100 text-lg mt-2">
                    Comprehensive review of financial aid request
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                {getStatusBadge(application.aidStatus)}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-10">
            {/* Course Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Course Information</h3>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span className="text-lg font-semibold text-gray-900">
                    {application?.courseId?.courseTitle || "Course information not available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <User className="w-4 h-4 text-green-600" />
                    Full Name
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    {application.firstName} {application.lastName}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Mail className="w-4 h-4 text-green-600" />
                    Email Address
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    {application.email}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Phone className="w-4 h-4 text-green-600" />
                    Phone Number
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    {application.phone || "Not provided"}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Calendar className="w-4 h-4 text-green-600" />
                    Date of Birth
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    {application.dateOfBirth
                      ? new Date(application.dateOfBirth).toLocaleDateString()
                      : "Not provided"}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Home className="w-4 h-4 text-green-600" />
                  Address Information
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border space-y-2">
                  <div><strong>Street:</strong> {application.address || "Not provided"}</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><strong>City:</strong> {application.city || "Not provided"}</div>
                    <div><strong>State:</strong> {application.state || "Not provided"}</div>
                    <div><strong>Postal Code:</strong> {application.zipCode || "Not provided"}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Financial Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Briefcase className="w-4 h-4 text-yellow-600" />
                    Employment Status
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    {application.employmentStatus || "Not specified"}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <DollarSign className="w-4 h-4 text-yellow-600" />
                    Annual Income
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    PKR {application.annualIncome ? parseInt(application.annualIncome).toLocaleString() : "Not provided"}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Users className="w-4 h-4 text-yellow-600" />
                    Household Size
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    {application.householdSize || "Not specified"} {application.householdSize === "6+" ? "people" : application.householdSize === "1" ? "person" : "people"}
                  </div>
                </div>
              </div>
            </div>

            {/* Education Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Education Information</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-gray-900">Current Student Status</span>
                  </div>
                  <div className="text-lg">
                    {application.currentStudent === "yes" ? "Currently enrolled as a student" : "Not currently a student"}
                  </div>
                </div>
                
                {application.currentStudent === "yes" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <GraduationCap className="w-4 h-4 text-purple-600" />
                        School/Institution
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        {application.schoolName || "Not provided"}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <FileText className="w-4 h-4 text-purple-600" />
                        Program of Study
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        {application.programOfStudy || "Not provided"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Aid Request Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Aid Request Details</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FileText className="w-4 h-4 text-orange-600" />
                  Reason for Financial Aid Request
                </div>
                <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed break-words overflow-wrap-anywhere">
                    {application.aidReason || "No reason provided"}
                  </div>
                </div>
              </div>
            </div>

            {/* Application Status & Timeline */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Application Status</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Clock className="w-4 h-4 text-gray-600" />
                    Current Status
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    {getStatusBadge(application.aidStatus)}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    Submitted Date
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    {new Date(application.submittedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          {/* Action Buttons */}
          {application.aidStatus === "pending" && (
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Button
                  onClick={() => approveApp(application._id, "approved")}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <ThumbsUp className="w-5 h-5" />
                  Approve Application
                </Button>
                <Button
                  onClick={() => denyApp(application._id, "denied")}
                  variant="destructive"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <ThumbsDown className="w-5 h-5" />
                  Deny Application
                </Button>
              </div>
            </div>
          )}

          {application.aidStatus !== "pending" && (
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-t border-gray-200">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-gray-600">
                  <AlertCircle className="w-5 h-5" />
                  <span>This application has already been {application.aidStatus}</span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default FinancialAidView;
