import mongoose from "mongoose";

const FinancialAidSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  courseTitle: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  dateOfBirth: { type: Date },
  employmentStatus: { type: String },
  annualIncome: { type: Number },
  householdSize: { type: String },
  currentStudent: { type: String, enum: ["yes", "no"] },
  schoolName: { type: String },
  programOfStudy: { type: String },
  aidReason: { type: String },
  agreeToTerms: { type: Boolean, required: true },
  submittedAt: { type: Date, default: Date.now },
  aidStatus: {type: String, enum: ["pending", "approved", "denied"], default: "pending"},
});

export const FinancialAid = mongoose.model("FinancialAid", FinancialAidSchema);
