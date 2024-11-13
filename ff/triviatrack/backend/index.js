import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import StudentModel from "./models/student.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI);
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  StudentModel.findOne({ email }).then((user) => {
    if (user) {
      if (password === user.password) {
        const accesstoken = jwt.sign({ email }, process.env.JWT_ACCESS_TOKEN, {
          expiresIn: "1m",
        });
        const refreshtoken = jwt.sign(
          { email },
          process.env.JWT_REFRESH_TOKEN,
          { expiresIn: "5m" }
        );
        res.cookie("accesstoken", accesstoken, { maxAge: 60000 });
        res.cookie("refreshtoken", refreshtoken, {
          maxAge: 300000,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
        return res.json({ Login: true });
      } else {
        res.json({ Login: false, Message: "No Record Found" });
      }
    }
  });
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  StudentModel.findOne({ email }).then((user) => {
    if (user) {
      return res.json({ error: true, message: "Email already in use" });
    } else {
      StudentModel.create({ name, email, password })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    }
  });
});

const verifyuser = (req, res, next) => {
  const accesstoken = req.cookies.accesstoken;
  if (!accesstoken) {
    if (renewToken(req, res)) {
      next();
    } else {
      jwt.verify(accesstoken, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          return res.json({ valid: false, Message: "Invalid Token" });
        } else {
          req.email = decoded.email;
          next();
        }
      });
    }
  }
};

const renewToken = (req, res) => {
  const refreshtoken = req.cookies.refreshtoken;
  let exist = false;
  if (!refreshtoken) {
    return res.json({ valid: false, Message: "No Refresh Token" });
  } else {
    jwt.verify(refreshtoken, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.json({ valid: false, Message: "Invalid Refresh Token" });
      } else {
        const accesstoken = jwt.sign(
          { email: decoded.email },
          process.env.JWT_ACCESS_TOKEN,
          { expiresIn: "1m" }
        );
        res.cookie("accesstoken", accesstoken, { maxAge: 60000 });
        exist = true;
      }
    });
  }
  return exist;
};

app.get("/Dashboard", verifyuser, (req, res) => {
  return res.json({ valid: true, Message: "Welcome to Dashboard" });
});

app.listen(process.dotenv, () => {
  console.log("Server is running on port 3001");
});
