const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "completed"],
      default: "pending",
    },
    notes: { type: String },
    meetingLink: { type: String },
    feedback: {
        rating: { 
            type: Number, 
            min: 1, 
            max: 5 
        },
        comment: { 
            type: String 
        },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
