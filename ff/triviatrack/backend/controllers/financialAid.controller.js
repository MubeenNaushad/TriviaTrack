import { FinancialAid } from "../models/financialAid.model.js";
import { Course } from "../models/course.model.js";
import StudentModel from "../models/user.model.js";

export const createFinancialAidApplication = async (req, res) => {
  try {
    const studentId = req.id;
    const { courseId } = req.body;
    const formData = req.body;
    const newApplication = new FinancialAid({
      studentId: studentId,
      courseId: courseId,
      ...formData,
    });

    await newApplication.save();

    return res.status(201).json({
      message: "Application submitted successfully.",
      data: newApplication,
    });
  } catch (error) {
    console.error("Error saving application:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllFinancialAidApplications = async (req, res) => {
  try {
    const applications = await FinancialAid.find()
      .sort({ submittedAt: -1 })
      .populate("courseId", "courseTitle");
    return res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCourseAidApps = async (req, res) => {
  try {
    const teacherId = req.id;

    const TeacherCourses = await Course.find({ creator: teacherId }).select(
      "_id"
    );

    const courseIds = TeacherCourses.map((course) => course._id);

    const applications = await FinancialAid.find({
      courseId: { $in: courseIds },
    })
      .sort({ submittedAt: -1 })
      .populate("courseId", "courseTitle");

    return res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSpecificAid = async (req, res) => {
  try {
    const { appId } = req.params;
    const application = await FinancialAid.findById(appId).populate(
      "courseId",
      "courseTitle"
    );
    return res.status(200).json(application);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateFinancialAidApplication = async (req, res) => {
  try {
    const { appId } = req.params;
    const { aidStatus } = req.body;

    const allowedStatuses = ["pending", "approved", "denied"];

    if (!allowedStatuses.includes(aidStatus)) {
      return res.status(400).json({
        message:
          "Invalid status value. Allowed values are 'pending', 'approved', or 'denied'.",
      });
    }

    const newApplication = await FinancialAid.findByIdAndUpdate(
      appId,
      { aidStatus },
      { new: true }
    );

    if (!newApplication) {
      return res.status(404).json({ message: "Application not found." });
    }

    if (aidStatus === "approved") {
      await StudentModel.findByIdAndUpdate(
        newApplication.studentId,
        {
          $addToSet: { enrolledcourses: newApplication.courseId },
        },
        {
          new: true,
        }
      );

      await Course.findByIdAndUpdate(
        newApplication.courseId,
        {
          $addToSet: { enrolledStudents: newApplication.studentId },
        },
        {
          new: true,
        }
      );
    }

    return res.status(201).json({
      message: "Application judged successfully.",
      data: newApplication,
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
