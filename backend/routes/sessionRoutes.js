const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createSession,
  respondToSession,
  getMySessions,
  submitFeedback,
} = require("../controllers/sessionController");
const Session = require("../models/Session");

router.post("/", protect, createSession);
router.put("/:sessionId/respond", protect, respondToSession);
router.get("/my", protect, getMySessions);
router.post("/:sessionId/feedback", protect, submitFeedback);

router.patch("/:id/status", protect, async (req, res) => {
  const { status } = req.body;
  const allowedStatuses = ["pending", "accepted", "declined", "completed"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const session = await Session.findById(req.params.id)
      .populate("host", "name email")
      .populate("guest", "name email")
      .populate("skill", "name description");


    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
        if (!session.host || !session.guest) {
      return res.status(500).json({ message: "Malformed session data" });
    }

    if (
      session.host._id.toString() !== req.user._id.toString() &&
      session.guest._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }


    const currentStatus = session.status;

    const validTransitions = {
      pending: ["accepted", "declined"],
      accepted: ["completed"],
      declined: [],
      completed: [],
    };

    if (!validTransitions[currentStatus].includes(status)) {
      return res.status(400).json({
        message: `Cannot change status from '${currentStatus}' to '${status}'`,
      });
    }

    session.status = status;
    await session.save();

    res.json({ message: "Session status updated", session });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
