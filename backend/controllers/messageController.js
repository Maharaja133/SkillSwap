const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  const { receiver, content } = req.body;

  if (!content) return res.status(400).json({ message: "Message cannot be empty" });

  try {
    const message = await Message.create({
      sender: req.user._id,
      receiver,
      content,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getConversation = async (req, res) => {
  const { userId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    })
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecentChats = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
    })
      .sort({ createdAt: -1 })
      .populate("sender", "name email")
      .populate("receiver", "name email");

    const chatsMap = new Map();

    messages.forEach((msg) => {
      const otherUser =
        msg.sender._id.toString() === req.user._id.toString()
          ? msg.receiver
          : msg.sender;

      if (!chatsMap.has(otherUser._id.toString())) {
        chatsMap.set(otherUser._id.toString(), {
          user: otherUser,
          lastMessage: msg,
        });
      }
    });

    res.json([...chatsMap.values()]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getConversation = async (req, res) => {
  const { userId } = req.params;

  try {
    await Message.updateMany(
      {
        sender: userId,
        receiver: req.user._id,
        isRead: false,
      },
      { isRead: true }
    );

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
