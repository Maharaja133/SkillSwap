const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  sendMessage,
  getConversation,
  getRecentChats,
} = require("../controllers/messageController");


router.post("/", protect, sendMessage);
router.get("/recent", protect, getRecentChats);
router.get("/:userId", protect, getConversation);

router.put("/:messageId/read", protect, async (req, res) => {
  try {
    const message = await Message.findOneAndUpdate(
      {
        _id: req.params.messageId,
        receiver: req.user._id,
      },
      { isRead: true },
      { new: true }
    );

    if (!message) return res.status(404).json({ message: "Message not found" });

    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
