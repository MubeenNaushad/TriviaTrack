// models/score.model.js
import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const scoreSchema = new Schema({
  user:      { type: Types.ObjectId, ref: "Student", required: true },
  gameType:  { type: String,                   required: true }, 
  score:     { type: Number,                   required: true },
  createdAt: { type: Date,     default: Date.now },
});

export default model("Score", scoreSchema);
