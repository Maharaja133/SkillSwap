const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getMe, updateMe, getRecommendedPeers, changePassword, discoverUsers } = require("../controllers/userController");
const { updateProfileValidator } = require("../validators/userValidators");
const validateRequest = require("../middleware/validate");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

router.get("/me", protect, getMe);
router.put("/me", protect, updateProfileValidator, validateRequest, updateMe);
router.get("/recommendations", protect, getRecommendedPeers);

router.get("/discover", protect, discoverUsers);

router.get("/search", protect, async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ message: "Search query is required" });
  }

  const searchRegex = new RegExp(query, "i");

  try {
    const users = await User.find()
      .populate("skillsOffered", "name")
      .populate("skillsWanted", "name")
      .select("-password");

    const filteredUsers = users.filter((user) => {
      const nameMatch = searchRegex.test(user.name);
      const offeredMatch = user.skillsOffered.some((s) => searchRegex.test(s.name));
      const wantedMatch = user.skillsWanted.some((s) => searchRegex.test(s.name));
      return nameMatch || offeredMatch || wantedMatch;
    });

    res.json(filteredUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/availability", protect, async (req, res) => {
  const { availability } = req.body;

  if (!Array.isArray(availability)) {
    return res.status(400).json({ message: "Availability must be an array." });
  }

  try {
    const user = await User.findById(req.user._id);
    user.availability = availability;
    await user.save();
    res.json({ message: "Availability updated successfully", availability });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/availability", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("availability");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.availability);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/change-password", auth, changePassword);


module.exports = router;