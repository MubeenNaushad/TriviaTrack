import StudentModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const login = (req, res) => {
  const { email, password,userType } = req.body;
  StudentModel.findOne({ email })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (err) {
            res.json({ Login: false, Message: "Invalid Password" });
          }
         
         
          if (response) {
            const accesstoken = jwt.sign(
              { email },
              process.env.JWT_ACCESS_TOKEN,
              {
                expiresIn: "10m",
              }
            );
            const refreshtoken = jwt.sign(
              { email },
              process.env.JWT_REFRESH_TOKEN,
              { expiresIn: "50m" }
            );
            res.cookie("accesstoken", accesstoken, { maxAge: 600000 });
            res.cookie("refreshtoken", refreshtoken, {
              maxAge: 3000000,
              httpOnly: true,
              secure: true,
              sameSite: "strict",
            });
            return res.json({ Login: true });
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
    // Check if the user already exists
    const existingUser = await StudentModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: true, message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new StudentModel({
      name,
      email,
      password: hashedPassword,
      userType
    });

    // Save the user to the database
    await newUser.save();

    // Respond with the created user
    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }
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

export const updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No student with that id");
  } else {
    const updatedStudent = { name, email, password, _id: id };
    StudentModel.findByIdAndUpdate(id, { name, email, password }, { new: true })
      .then((updatedStudent) => res.json(updatedStudent))
      .catch((err) => res.json({ error: err.message }));
  }
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
    const userId = req._id;
    const user = await StudentModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.json ({ success:true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


export const verifyUser = (req, res) => {
  const accesstoken = req.cookies.accesstoken;
  if (!accesstoken) {
    return res.json({ valid: false, Message: "No Access Token" });
  }

  jwt.verify(accesstoken, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.json({ valid: false, Message: "Invalid Token" });
    } else {
      // Find user by email and role
      StudentModel.findOne({ email: decoded.email }).then((user) => {
        if (user) {
          // Check for userType mismatch
          if (user.role !== decoded.userType) {
            return res.json({
              valid: false,
              Message: `Access Denied: Expected role ${decoded.userType}, but user is ${user.role}`,
            });
          }

          // If userType matches, allow access
          res.json({
            valid: true,
            user: { name: user.name, email: user.email, role: user.role },
          });
        } else {
          res.json({ valid: false, Message: "User Not Found" });
        }
      }).catch((err) => {
        res.status(500).json({ valid: false, Message: "Internal Server Error" });
      });
    }
  });
};
