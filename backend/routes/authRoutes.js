const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../validators/authValidators");
const validateRequest = require("../middleware/validate");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
