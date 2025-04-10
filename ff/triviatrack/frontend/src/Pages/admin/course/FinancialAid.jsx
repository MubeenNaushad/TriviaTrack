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

export default function FinancialAidForm() {
  const [formData, setFormData] = useState({
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

    if (!formData.firstName || !formData.lastName || !formData.email) {
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

    console.log("Form submitted:", formData);

    toast({
      title: "Application Submitted",
      description:
        "Your financial aid application has been submitted successfully.",
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 pt-32">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="text-2xl">Financial Aid Application</CardTitle>
          <CardDescription>
            Please complete all fields accurately to apply for financial
            assistance.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ssn">
                    Social Security Number (Last 4 digits)
                  </Label>
                  <Input
                    id="ssn"
                    name="ssn"
                    maxLength={4}
                    value={formData.ssn}
                    onChange={handleChange}
                    placeholder="XXXX"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) =>
                      handleSelectChange("state", value)
                    }
                  >
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AL">Alabama</SelectItem>
                      <SelectItem value="AK">Alaska</SelectItem>
                      <SelectItem value="AZ">Arizona</SelectItem>
                      {/* Add more states as needed */}
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="CO">Colorado</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Financial Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus">Employment Status</Label>
                  <Select
                    value={formData.employmentStatus}
                    onValueChange={(value) =>
                      handleSelectChange("employmentStatus", value)
                    }
                  >
                    <SelectTrigger id="employmentStatus">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fullTime">Full-time</SelectItem>
                      <SelectItem value="partTime">Part-time</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="selfEmployed">
                        Self-employed
                      </SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income ($)</Label>
                  <Input
                    id="annualIncome"
                    name="annualIncome"
                    type="number"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="householdSize">Household Size</Label>
                  <Select
                    value={formData.householdSize}
                    onValueChange={(value) =>
                      handleSelectChange("householdSize", value)
                    }
                  >
                    <SelectTrigger id="householdSize">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6+">6 or more</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Education Information</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Are you currently a student?</Label>
                  <RadioGroup
                    value={formData.currentStudent}
                    onValueChange={handleRadioChange}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="student-yes" />
                      <Label htmlFor="student-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="student-no" />
                      <Label htmlFor="student-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.currentStudent === "yes" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">School Name</Label>
                      <Input
                        id="schoolName"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="programOfStudy">Program of Study</Label>
                      <Input
                        id="programOfStudy"
                        name="programOfStudy"
                        value={formData.programOfStudy}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Aid Request Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Aid Request</h3>
              <div className="space-y-2">
                <Label htmlFor="aidReason">
                  Please explain why you are requesting financial aid and how it
                  will help you
                </Label>
                <Textarea
                  id="aidReason"
                  name="aidReason"
                  value={formData.aidReason}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, agreeToTerms: checked }))
                  }
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I certify that all information provided is true and accurate.
                  I understand that providing false information may result in
                  denial of aid and possible legal action.
                </Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6 bg-slate-50">
            <Button type="button" variant="outline">
              Save Draft
            </Button>
            <Button type="submit">Submit Application</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
