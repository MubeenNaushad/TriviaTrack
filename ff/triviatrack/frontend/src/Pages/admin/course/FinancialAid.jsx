import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  GraduationCap, 
  FileText, 
  Shield,
  Calendar,
  Users,
  Briefcase,
  Home,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function FinancialAidForm() {
  const { courseId } = useParams();

  const [formData, setFormData] = useState({
    courseId: courseId,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    employmentStatus: "",
    annualIncome: "",
    householdSize: "",
    currentStudent: "no",
    schoolName: "",
    programOfStudy: "",
    aidReason: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      currentStudent: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email ||   formData.aidReason.trim().length < 300) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    console.log("Form should submit:", formData);

    axios
      .post(
        `${import.meta.env.VITE_APP_BASEURL}/financial-aid/sendaidapp`,
        formData
      )
      .then((res) => {
        console.log("Response:", res.data);
        toast({
          title: "Success",
          description: "Application submitted successfully.",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          dateOfBirth: "",
          ssn: "",
          employmentStatus: "",
          annualIncome: "",
          householdSize: "",
          currentStudent: "no",
          schoolName: "",
          programOfStudy: "",
          aidReason: "",
          agreeToTerms: false,
        });
      })
      .catch((err) => {
        console.log("Error:", err);
        toast({
          title: "Submission Error",
          description: "There was an error submitting your application.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-200 py-12 px-4">
     
      <div className="text-center mb-12 pt-20">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Financial Aid Application
        </h1>
  
      </div>

      <div className="max-w-5xl mx-auto">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8" />
              <div>
                <CardTitle className="text-3xl font-bold">Application Form</CardTitle>
                <CardDescription className="text-blue-100 text-lg mt-2">
                  Complete all sections to submit your financial aid request
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="p-8 space-y-10">
             
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="dateOfBirth" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Home className="w-4 h-4 text-blue-600" />
                    Full Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Enter your complete address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="city" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="Enter your city"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="state" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Province/State
                    </Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => handleSelectChange("state", value)}
                    >
                      <SelectTrigger id="state" className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AL">Sindh</SelectItem>
                        <SelectItem value="AK">Balochistan</SelectItem>
                        <SelectItem value="AZ">KPK</SelectItem>
                        <SelectItem value="CA">Punjab</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="zipCode" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      Postal Code
                    </Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Financial Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="employmentStatus" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-green-600" />
                      Employment Status
                    </Label>
                    <Select
                      value={formData.employmentStatus}
                      onValueChange={(value) => handleSelectChange("employmentStatus", value)}
                    >
                      <SelectTrigger id="employmentStatus" className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fullTime">Full-time Employed</SelectItem>
                        <SelectItem value="partTime">Part-time Employed</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                        <SelectItem value="selfEmployed">Self-employed</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="annualIncome" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      Annual Income (PKR)
                    </Label>
                    <Input
                      id="annualIncome"
                      name="annualIncome"
                      type="number"
                      value={formData.annualIncome}
                      onChange={handleChange}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="Enter annual income"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="householdSize" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-600" />
                      Household Size
                    </Label>
                    <Select
                      value={formData.householdSize}
                      onValueChange={(value) => handleSelectChange("householdSize", value)}
                    >
                      <SelectTrigger id="householdSize" className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 person</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3">3 people</SelectItem>
                        <SelectItem value="4">4 people</SelectItem>
                        <SelectItem value="5">5 people</SelectItem>
                        <SelectItem value="6+">6 or more people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>


              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Education Information</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      Are you currently a student?
                    </Label>
                    <RadioGroup
                      value={formData.currentStudent}
                      onValueChange={handleRadioChange}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-all duration-200">
                        <RadioGroupItem value="yes" id="student-yes" />
                        <Label htmlFor="student-yes" className="font-medium">Yes, I am currently a student</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-all duration-200">
                        <RadioGroupItem value="no" id="student-no" />
                        <Label htmlFor="student-no" className="font-medium">No, I am not currently a student</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.currentStudent === "yes" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <div className="space-y-3">
                        <Label htmlFor="schoolName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-purple-600" />
                          School/Institution Name
                        </Label>
                        <Input
                          id="schoolName"
                          name="schoolName"
                          value={formData.schoolName}
                          onChange={handleChange}
                          className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                          placeholder="Enter your school name"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="programOfStudy" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-purple-600" />
                          Program of Study
                        </Label>
                        <Input
                          id="programOfStudy"
                          name="programOfStudy"
                          value={formData.programOfStudy}
                          onChange={handleChange}
                          className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                          placeholder="e.g., Computer Science, MBA"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>


              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Aid Request Details</h3>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="aidReason" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-600" />
                    Please explain why you are requesting financial aid and how it will help you
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Textarea
                      id="aidReason"
                      name="aidReason"
                      value={formData.aidReason}
                      onChange={handleChange}
                      rows={6}
                      minLength={300}
                      className="border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 resize-none"
                      placeholder="Describe your financial situation, educational goals, and how this aid would make a difference in your academic journey. Please be detailed and honest about your circumstances. (Minimum 300 characters)"
                      required
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-500 bg-white px-2 py-1 rounded">
                      {formData.aidReason.length}/300 min
                    </div>
                  </div>
                </div>
              </div>

          
              <div className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Terms & Conditions</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-blue-200">
                    <Checkbox
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
                      }
                      className="mt-1"
                      required
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm text-gray-700 leading-relaxed font-medium">
                      <span className="font-semibold text-gray-900">I certify and agree:</span><br />
                      • All information provided is true, accurate, and complete to the best of my knowledge<br />
                      • I understand that providing false information may result in denial of aid and possible legal action<br />
                      • I authorize the verification of the information provided in this application<br />
                      • I agree to the terms and conditions of the TriviaTrack financial aid program
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-t border-gray-200">
              <div className="w-full flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>Please review all information before submitting</span>
                </div>
                <div className="flex gap-3">
                
                  <Button 
                    type="submit" 
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    disabled={!formData.agreeToTerms || formData.aidReason.length < 300}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Submit Application
                  </Button>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
