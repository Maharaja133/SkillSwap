const Skill = require("../models/Skill");

exports.createSkill = async (req, res) => {
  try {
    const { name, category = "", description = "" } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Skill name is required" });
    }

    const normalizedName = name.toLowerCase().trim();

    let skill = await Skill.findOne({ name: normalizedName });

    if (skill) {
      return res.status(200).json(skill);
    }

    skill = await Skill.create({
      name: normalizedName,
      category: category.trim(),
      description: description.trim(),
    });

    res.status(201).json(skill);
  } catch (err) {
    console.error("Error creating skill:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllSkills = async (req, res) => {
  try {
    const { q, page = 1, limit = 50 } = req.query;

    const query = q
      ? { name: { $regex: q.trim(), $options: "i" } }
      : {};

    const skills = await Skill.find(query)
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(skills);
  } catch (err) {
    console.error("Error fetching skills:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
