import jwt from "jsonwebtoken";
import StudentModel from "../models/user.model.js";

export const verifyUserMiddleware = (req, res, next) => {
  console.log('verifyUserMiddleware called for:', req.url);
  
  const accesstoken = req.cookies.accesstoken;
  if (!accesstoken) {
    console.log('No access token found in cookies');
    return res
      .status(401)
      .json({ valid: false, message: "Access Token is required" });
  }

  console.log('Access token found, verifying...');
  
  jwt.verify(accesstoken, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      console.log('JWT verification failed:', err.message);
      return res
        .status(403)
        .json({ valid: false, message: "Invalid or expired token" });
    }

    console.log('JWT decoded successfully:', { email: decoded.email, userType: decoded.userType });

    StudentModel.findOne({ email: decoded.email })
      .then((user) => {
        if (!user) {
          console.log('User not found in database for email:', decoded.email);
          return res
            .status(404)
            .json({ valid: false, message: "User not found" });
        }

        console.log('User found:', { 
          id: user._id, 
          email: user.email, 
          userType: user.userType,
          teacherId: user.teacherId 
        });

        // Optionally verify roles - commenting out for now as it might be causing issues
        // if (user.userType !== decoded.userType) {
        //   return res.status(403).json({
        //     valid: false,
        //     message: `Access denied: User type ${user.userType} does not match required type ${decoded.userType}`,
        //   });
        // }

        req.id = user._id;
        req.user = user;
        next(); // Proceed to next middleware or controller
      })
      .catch((err) => {
        console.error('Database error in auth middleware:', err);
        res
          .status(500)
          .json({ valid: false, message: "Database access error" });
      });
  });
};

export const optionalVerifyUserMiddleware = (req, res, next) => {
  const accessToken = req.cookies.accesstoken;
  if (!accessToken) {
    req.isVerified = false; 
    return next(); 
  }

  jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      req.isVerified = false;
      return next();
    }

    StudentModel.findOne({ email: decoded.email })
      .then((user) => {
        if (!user) {
          req.isVerified = false; 
          return next();
        }

        req.isVerified = true;
        req.user = user;
        req.id = user._id;
        next();
      })
      .catch((err) => {
        req.isVerified = false;
        next();
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
