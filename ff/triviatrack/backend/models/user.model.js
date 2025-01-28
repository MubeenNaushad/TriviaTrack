import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, 
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
     password: {
    type: String,
    required: function() {
      return !this.googleId; // Password is required only if googleId is not present
    },
  },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["Teacher", "Student", "Admin"],
      default: "Student",
    },
    enrolledcourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    photoUrl: {
      type: String,
      default: "",
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const StudentModel = mongoose.model("User", userSchema);

export default StudentModel;
