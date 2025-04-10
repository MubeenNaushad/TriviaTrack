import {FinancialAid} from "../models/financialAid.model.js";


export const createFinancialAidApplication = async (req, res) => {
  try {
    const studentId = req.id;
    const {courseId} = req.body;
    const formData = req.body;
    const newApplication = new FinancialAid({
        studentId: studentId,
        courseId: courseId,
        ...formData
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
    const applications = await FinancialAid.find().sort({ submittedAt: -1 });
    return res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSpecificAid = async (req, res) => {
    try {
        const {appId} = req.params;
      const application = await FinancialAid.findById(appId);
      return res.status(200).json(application);
    } catch (error) {
      console.error("Error fetching applications:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

export const updateFinancialAidApplication = async (req, res) => {
    try {
      
        const {appId} = req.params;
        const {aidStatus} = req.body;

        const allowedStatuses = ["pending", "approved", "denied"];
  
        if (!allowedStatuses.includes(aidStatus)) {
          return res.status(400).json({ message: "Invalid status value. Allowed values are 'pending', 'approved', or 'denied'." });
        }

        const newApplication = await FinancialAid.findByIdAndUpdate(appId,
            {aidStatus},
            {new:true},
        );
  
        if (!newApplication) {
            return res.status(404).json({ message: "Application not found." });
        }

      return res.status(201).json({
        message: "Application submitted successfully.",
        data: newApplication,
      });
    } catch (error) {
      console.error("Error saving application:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };