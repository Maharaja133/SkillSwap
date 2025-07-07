const Session = require("../models/Session");
const createNotification = require("../utils/createNotification");

exports.createSession = async (req, res) => {
  const { host, skill, dateTime, notes } = req.body;

  if (host === req.user._id.toString()) {
    return res.status(400).json({ message: "You cannot request a session with yourself" });
  }

  try {
    const session = await Session.create({
      host,
      guest: req.user._id,
      skill,
      dateTime,
      notes,
    });

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  await createNotification({
    userId: host,
    type: "session-request",
    message: `${req.user.name} has requested a session with you.`,
    link: `/sessions`,
    });
};

exports.respondToSession = async (req, res) => {
  const { sessionId } = req.params;
  const { status, meetingLink } = req.body;

  try {
    const session = await Session.findById(sessionId);

    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only the host can respond" });
    }

    session.status = status;
    if (status === "accepted") session.meetingLink = meetingLink;

    await session.save();
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  await createNotification({
    userId: session.guest,
    type: "session-accepted",
    message: `${req.user.name} accepted your session request.`,
    link: `/sessions/${session._id}`,
    });
};

exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      $or: [{ guest: req.user._id }, { host: req.user._id }],
    })
      .populate("host", "name email")
      .populate("guest", "name email")
      .populate("skill", "name");

    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.submitFeedback = async (req, res) => {
  const { sessionId } = req.params;
  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const session = await Session.findById(sessionId);

    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.guest.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only the guest can leave feedback" });
    }

    if (session.status !== "completed") {
      return res.status(400).json({ message: "Feedback can only be submitted for completed sessions" });
    }

    session.feedback = { rating, comment };
    await session.save();

    res.status(200).json({ message: "Feedback submitted", session });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

