import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    if (!req.user) {
      return res.redirect(`${process.env.FRONTEND_URL}/auth/failure`);
    }

    // Extract user data
    const { user, token } = req.user;
    console.log("Authentication successful:", { user, token });

    // Redirect user to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  }
);

router.get("/failure", (req, res) => {
  console.error("Authentication failed");
  res.status(401).json({ message: "Authentication failed" });
});

export default router;
