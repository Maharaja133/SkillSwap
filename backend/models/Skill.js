const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
