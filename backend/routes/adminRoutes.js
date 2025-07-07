const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Session = require("../models/Session");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/users", protect, admin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.delete("/users/:id", protect, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/sessions", protect, admin, async (req, res) => {
  const sessions = await Session.find()
    .populate("sender", "name email")
    .populate("receiver", "name email");
  res.json(sessions);
});

router.get("/feedback", protect, admin, async (req, res) => {
  const feedbacks = await Feedback.find()
    .populate("from", "name email")
    .populate("to", "name email");
  res.json(feedbacks);
});

router.patch("/users/:id/block", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
