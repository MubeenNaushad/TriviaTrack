// controllers/game.controller.js
import StudentModel from "../models/user.model.js";
import ScoreModel   from "../models/score.model.js";
import nodemailer   from "nodemailer";

// inline thresholds for each game
const PASS_THRESHOLD = {
  arrow:   80,
  reactor: 120,
};

export const submitScore = async (req, res) => {
  try {
    const userId   = req.user._id;              // set by your verifyUserMiddleware
    const { score, gameType } = req.body;

    // 1) persist to DB
    await ScoreModel.create({ user: userId, gameType, score });

    // 2) check threshold & send email if passed
    const threshold = PASS_THRESHOLD[gameType] ?? Infinity;
    if (score > threshold) {
      const user = await StudentModel.findById(userId).select("name email");
      if (user?.email) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SMTP_USER,  // e.g. triviatrack09@gmail.com
            pass: process.env.SMTP_PASS,  // your app password
          },
        });

        await transporter.sendMail({
          from:    process.env.SMTP_USER,
          to:      user.email,
          subject: `🎉 You passed the ${gameType} challenge!`,
          text: `
Hi ${user.name || ""},

Congrats! You scored ${score} points in the “${gameType}” game (threshold: ${threshold}), and have officially passed.

—The TriviaTrack Team
          `.trim(),
        });
      }
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("submitScore error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
