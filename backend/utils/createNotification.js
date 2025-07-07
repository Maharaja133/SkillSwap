const Notification = require("../models/Notification");

const createNotification = async ({ userId, type, message, link }) => {
  try {
    const notification = new Notification({
      user: userId,
      type,
      message,
      link,
    });

    await notification.save();
  } catch (err) {
    console.error("Notification error:", err.message);
  }
};

module.exports = createNotification;
