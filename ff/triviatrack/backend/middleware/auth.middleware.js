import jwt from "jsonwebtoken";

export const verifyUserMiddleware = (req, res, next) => {
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