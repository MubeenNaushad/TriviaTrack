import jwt from "jsonwebtoken";
import StudentModel from "../models/user.model.js";

export const verifyUserMiddleware = (req, res, next) => {
  const accesstoken = req.cookies.accesstoken;
  if (!accesstoken) {
    return res.status(401).json({ valid: false, message: "Access Token is required" });
  }

  jwt.verify(accesstoken, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ valid: false, message: "Invalid or expired token" });
    }

    StudentModel.findOne({ email: decoded.email }).then(user => {
      if (!user) {
        return res.status(404).json({ valid: false, message: "User not found" });
      }

      // Optionally verify roles
      if (user.role !== decoded.userType) {
        return res.status(403).json({
          valid: false,
          message: `Access denied: User role ${user.role} does not match required role ${decoded.userType}`
        });
      }
      
      req.user = user;
      next(); // Proceed to next middleware or controller
    }).catch(err => {
      res.status(500).json({ valid: false, message: "Database access error" });
    });
  });
};


const renewToken = (req, res) => {
  const refreshtoken = req.cookies.refreshtoken;
  let exist = false;
  if (!refreshtoken) {
    return res.json({ valid: false, Message: "No Refresh Token" });
  } else {
    jwt
      .verify(refreshtoken, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
        if (err) {
          return res.json({ valid: false, Message: "Invalid Refresh Token" });
        } else {
          const accesstoken = jwt.sign(
            { email: decoded.email },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: "10m" }
          );
          res.cookie("accesstoken", accesstoken, { maxAge: 60000 });
          exist = true;
        }
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  }
  return exist;
};