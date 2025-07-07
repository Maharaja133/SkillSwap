const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    profilePicture: { type: String, default: "" },
    skillsOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    skillsWanted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    availability: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    availability: { type: [String], default: [] },


  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
