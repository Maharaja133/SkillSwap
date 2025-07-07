const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Notification = require("../models/Notification");

router.get("/", protect, async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notifications);
});

router.put("/:id/read", protect, async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { isRead: true },
    { new: true }
  );

  if (!notification) return res.status(404).json({ message: "Not found" });

  res.json(notification);
});

module.exports = router;