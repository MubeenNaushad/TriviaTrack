import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import StudentModel from "./models/student.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

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

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.log(err);
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;
  StudentModel.findOne({ email }).then((user) => {
    if (user) {
      bcrypt.compare(password,user.password,(err,response)=>{
        if(err){
          res.json({Login:false,Message:"Invalid Password"})
        }
        if(response){
          const accesstoken = jwt.sign({ email }, process.env.JWT_ACCESS_TOKEN, {
            expiresIn: "10m",
          });
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
        }
        else {
          res.json({ Login: false, Message: "No Record Found" });
        }
      })    
    }
  }).catch(err => {
    res.json({ error: err.message });
  });
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
 

  StudentModel.findOne({ email }).then((user) => {
    if (user) {
      return res.json({ error: true, message: "Email already in use" });
    } else {
       bcrypt.hash(password, 10)
  .then(hash =>{
    StudentModel.create({ name, email, password:hash })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
  }); 
    }
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("accesstoken");
  res.clearCookie("refreshtoken");
  res.json({ success: true });
});

app.get("/students", (req, res) => {
  StudentModel.find({})
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

const verifyuser = (req, res, next) => {
  const accesstoken = req.cookies.accesstoken;
  if (!accesstoken) {
    if (renewToken(req, res)) {
      next();
    } else {
      return res.json({ valid: false, Message: "No Access" });
    }
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
          { expiresIn: "10m" }
        );
        res.cookie("accesstoken", accesstoken, { maxAge: 60000 });
        exist = true;
      }
    }).catch(err => {
      res.json({ error: err.message });
    });
  }
  return exist;
};

app.get("/Dashboard", verifyuser, (req, res) => {
  return res.json({ valid: true, Message: "Welcome to Dashboard" });
});

app.get("/verifyuser", (req, res) => {
  const accesstoken = req.cookies.accesstoken;
  if (!accesstoken) {
    return res.json({ valid: false, Message: "No Access Token" });
  }

  jwt.verify(accesstoken, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.json({ valid: false, Message: "Invalid Token" });
    } else {
      StudentModel.findOne({ email: decoded.email }).then((user) => {
        if (user) {
          res.json({ valid: true, user: { name: user.name, email: user.email } });
        } else {
          res.json({ valid: false, Message: "User Not Found" });
        }
      });
    }
  });
});


app.delete("/students/delete/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("No student with that id"); 
  } else {
    StudentModel.findByIdAndDelete(id)
    .then(() => res.json("Student deleted successfully"))
    .catch((err) => res.status(400).json({ error: err.message }));
  }
});


app.patch("/students/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = red.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No student with that id");
  } else {
    const updatedStudent = { name, email, password, _id: id };
    StudentModel.findByIdAndUpdate(id, { name, email, password }, { new: true })
      .then((updatedStudent) => res.json(updatedStudent))
      .catch((err) => res.json({ error: err.message }));
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
