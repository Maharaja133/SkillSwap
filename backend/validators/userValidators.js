const { body } = require("express-validator");

exports.updateProfileValidator = [
  body("name").optional().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("bio").optional().isLength({ max: 300 }).withMessage("Bio can't exceed 300 characters"),
  body("location").optional().isString(),
  body("profilePicture").optional().isURL().withMessage("Profile picture must be a valid URL"),
  body("skillsOffered").optional().isArray().withMessage("Skills offered must be an array"),
  body("skillsWanted").optional().isArray().withMessage("Skills wanted must be an array"),
  body("availability")
    .optional()
    .isIn(["Weekdays", "Weekends", "Evenings", "Mornings"])
    .withMessage("Availability must be one of: Weekdays, Weekends, Evenings, Mornings"),
];
