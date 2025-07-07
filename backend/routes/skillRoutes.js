const express = require("express");
const router = express.Router();
const { createSkill, getAllSkills } = require("../controllers/skillController");
const protect = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/", getAllSkills);
router.post("/", protect, createSkill);

router.get("/discover", async (req, res) => {
  const { type = "both" } = req.query;

  try {
    const users = await User.find()
      .populate("skillsOffered", "name")
      .populate("skillsWanted", "name");

    let skills = [];

    for (const user of users) {
      if (type === "offered" || type === "both") {
        skills.push(...(user.skillsOffered.map(skill => skill.name) || []));
      }
      if (type === "wanted" || type === "both") {
        skills.push(...(user.skillsWanted.map(skill => skill.name) || []));
      }
    }

    const skillCount = {};

    skills.forEach((skillName) => {
      skillCount[skillName] = (skillCount[skillName] || 0) + 1;
    });

    const result = Object.entries(skillCount).map(([skill, count]) => ({
      skill,
      count,
    }));

    result.sort((a, b) => b.count - a.count);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/users/:skillName", protect, async (req, res) => {
  const { skillName } = req.params;
  const type = req.query.type || "both";

  let query = {
    $or: [],
  };

  if (type === "offered" || type === "both") {
    query.$or.push({ "skillsOffered": skillName });
  }

  if (type === "wanted" || type === "both") {
    query.$or.push({ "skillsWanted": skillName });
  }

  try {
    const users = await User.find(query).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
