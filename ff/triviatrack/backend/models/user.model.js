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
      return !this.googleId; 
    },
  },
    teacherId: {
    type: String,
    unique: true,
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

// Pre-save middleware to generate teacherId for teachers
userSchema.pre('save', function(next) {
  if (this.userType === 'Teacher' && !this.teacherId) {
    // Generate a unique teacherId (format: T + timestamp + random)
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    this.teacherId = `T${timestamp}${random}`;
  }
  next();
});

const StudentModel = mongoose.model("User", userSchema);

export default StudentModel;
