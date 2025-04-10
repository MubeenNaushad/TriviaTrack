import StudentModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { uploadMedia, deleteMedia } from "../utils/cloudinary.js";
import nodemailer from "nodemailer";

export const login = (req, res) => {
  const { email, password, userType } = req.body;
  StudentModel.findOne({ email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (err) {
            res.json({ Login: false, Message: "Invalid Password" });
          }

          if (!user.isVerified) {
            return res.json({
              Login: true,
              isVerified: false,
              Message: "Account not verified. Please check your email.",
            });
          }

          if (response) {
            const accesstoken = jwt.sign(
              { email },
              process.env.JWT_ACCESS_TOKEN,
              {
                expiresIn: "50m",
              }
            );
            const refreshtoken = jwt.sign(
              { email },
              process.env.JWT_REFRESH_TOKEN,
              { expiresIn: "100m" }
            );
            res.cookie("accesstoken", accesstoken, { maxAge: 6000000 });
            res.cookie("refreshtoken", refreshtoken, {
              maxAge: 30000000,
              httpOnly: true,
              secure: true,
              sameSite: "strict",
            });
            return res.json({ Login: true,userType: user.userType, isVerified: true });
          } else {
            res.json({ Login: false, Message: "No Record Found" });
          }
        });
      }
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
};

export const signup = async (req, res) => { 
  const { name, email, password, userType } = req.body;

  try {
    const existingUser = await StudentModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: true, message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWTKey);

    const newUser = new StudentModel({
      name,
      email,
      password: hashedPassword,
      userType,
      isVerified: false,
      verificationToken,
    });

    await newUser.save();

    sendVerificationEmail(email, verificationToken);
    return res.status(201).json({user: newUser, message: "Verification Pending"});
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
};

const sendVerificationEmail = (email, token) => {
  const transporter = nodemailer.createTransport({ 
    service: "gmail",
    auth: {
      user: "triviatrack09@gmail.com",
      pass: "soft epwk mzui kcuw",
    },
  });

  const mailOptions = {
    from: "triviatrack09@gmail.com",
    to: email,
    subject: "Verify Your Account",
    text: `Please click on the following link to verify your account: ${process.env.FRONTEND_URL}/students/verify-account/${token}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const verifyYourEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWTKey);

    const user = await StudentModel.findOne({
      email: decoded.email,
      verificationToken: token,
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid token or already verified" });
    }

    user.isVerified = true;
    user.verificationToken = "Verified";
    await user.save();

    return res.status(201).json(user);

  } catch (error) {
    return res.status(500).json(error);
  }
};

export const sendNotification = async(req, res) => {

  const {email} = req.user;
  const {roomid} = req.params;

  const count = count+1;

  console.log("email is here", req.user);

  const transporter = nodemailer.createTransport({ 
    service: "gmail",
    auth: {
      user: "triviatrack09@gmail.com",
      pass: "soft epwk mzui kcuw",
    },
  });

  const mailOptions = {
    from: "triviatrack09@gmail.com", 
    to: email,
    subject: "Meeting Notification",
    text: `You have left the meeting: ${roomid}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  console.log(sendNotification)
};

export const logout = (_, res) => {
  res.clearCookie("accesstoken");
  res.clearCookie("refreshtoken");
  res.json({ success: true });
};

export const getStudents = (req, res) => {
  StudentModel.find({})
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

export const deleteStudent = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("No student with that id");
  } else {
    StudentModel.findByIdAndDelete(id)
      .then(() => res.json("Student deleted successfully"))
      .catch((err) => res.status(400).json({ error: err.message }));
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await StudentModel.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


export const getStudentProfile = async (req, res) => {
  try {
    const userId = req.params.studentId;

    const user = await StudentModel.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const name = req.body.name;
    const profilePhoto = req.file;

    const user = await StudentModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    let photoUrl = user.photoUrl;

    if (profilePhoto) {
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];
        await deleteMedia(publicId); // Ensure deletion is awaited if it's asynchronous
      }
      const cloudResponse = await uploadMedia(profilePhoto.path);
      photoUrl = cloudResponse.secure_url; // Modify the outer photoUrl variable
    }

    console.log("Received userId:", userId);
    console.log("Received name:", { name });
    console.log("Received photo file:", { photoUrl });

    const updatedUser = await StudentModel.findByIdAndUpdate(
      userId,
      { name, photoUrl },
      { new: true }
    ).select("-password");
    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const ForgotPassword = async (req, res) => {
  const { email } = req.body;

  StudentModel.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ Status: "User not existed." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: "1d",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "triviatrack09@gmail.com",
        pass: "soft epwk mzui kcuw",
      },
    });

    var mailOptions = {
      from: `triviatrack09@gmail.com`,
      to: `${email}`,
      subject: "Reset Password Link",
      text: `${process.env.FRONTEND_URL}/students/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
};

export const ResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, `${process.env.JWT_ACCESS_TOKEN}`, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          StudentModel.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ user: u, Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => console.log(err));
    }
  });
};


export const getMyLearning = async (req, res) => {
  try {

    const userId = req.id;
    const user = await StudentModel.findById(userId).populate("enrolledcourses");

    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user, enrolledCourses: user.enrolledcourses });

  } catch(error) {

    return res.status(404).json({ message: "Issue in backend" })
  }
}