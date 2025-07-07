const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      bio: req.body.bio,
      location: req.body.location,
      profilePicture: req.body.profilePicture,
      skillsOffered: req.body.skillsOffered,
      skillsWanted: req.body.skillsWanted,
      availability: req.body.availability,
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRecommendedPeers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("skillsWanted skillsOffered");

    if (!user) return res.status(404).json({ message: "User not found" });

    const userWanted = user.skillsWanted.map((s) => s._id.toString());

    const matches = await User.find({
      _id: { $ne: req.user._id },
      skillsOffered: { $in: userWanted },
    })
      .populate("skillsOffered", "name")
      .populate("skillsWanted", "name")
      .select("-password")

    const ranked = matches.map((peer) => {
      const matchCount = peer.skillsOffered.filter((skill) =>
        userWanted.includes(skill._id.toString())
      ).length;
      return { peer, matchCount };
    });

    ranked.sort((a, b) => b.matchCount - a.matchCount);

    res.status(200).json(ranked.map((r) => r.peer));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.user._id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.discoverUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id }, isBlocked: false })
      .populate("skillsOffered", "name")
      .populate("skillsWanted", "name")
      .select("name location profilePicture skillsOffered skillsWanted");

    res.status(200).json(users);
  } catch (err) {
    console.error("Error in discoverUsers:", err);
    res.status(500).json({ message: "Failed to discover users" });
  }
};
